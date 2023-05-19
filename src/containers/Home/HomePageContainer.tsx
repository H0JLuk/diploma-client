import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components/shared';
import { SubjectList } from '@/components/Subjects';
import { useMethods } from '@/hooks/useMethods';
import { useCheckAuthQuery } from '@/store/api/authApi';
import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useGetSubjectsQuery,
  useUpdateSubjectMutation,
} from '@/store/api/subjectApi';
import { Subject } from '@/types';

import { validationSchema } from './validation';

type ModalState =
  | {
      isOpened: false;
    }
  | { isOpened: true; mode: 'create' }
  | { isOpened: true; mode: 'edit'; subject: Subject };

const modalTitleTextByMode = {
  create: 'Создание предмета',
  edit: 'Редактирование предмета',
};

const formId = 'subject-form';

export const HomePageContainer: FC = () => {
  const formValues = useForm<{ name: string }>({
    defaultValues: { name: '' },
    resolver: yupResolver(validationSchema),
  });

  const [modalState, { openCreatingSubject, openEditingSubject, closeModal }] = useMethods({
    initialState: {
      isOpened: false,
    } as ModalState,
    methods: {
      openCreatingSubject: _ => ({
        isOpened: true,
        mode: 'create',
      }),
      openEditingSubject: (_, subject: Subject) => {
        formValues.setValue('name', subject.name);
        return { isOpened: true, mode: 'edit', subject };
      },
      closeModal: _ => {
        formValues.reset();
        return { isOpened: false };
      },
    },
  });

  const {
    currentData: subjectData,
    isFetching: isGetSubjectsFetching,
    isError: isGetSubjectsError,
  } = useGetSubjectsQuery(undefined);
  const [createSubjectMutation, { isLoading: isCreatingLoading, error: creatingError }] = useCreateSubjectMutation();
  const [updateSubjectMutation, { isLoading: isUpdatingLoading, error: updatingError }] = useUpdateSubjectMutation();
  const [deleteSubjectMutation, { isLoading: isDeleteSubjectLoading }] = useDeleteSubjectMutation();
  const { currentData: userInfo, isSuccess: isAuthorized } = useCheckAuthQuery();

  const hasMethodistPermissions = isAuthorized && !!userInfo && userInfo?.role !== 'Student';

  const isFetching = isDeleteSubjectLoading || isGetSubjectsFetching;

  const handleSubmit: Parameters<typeof formValues.handleSubmit>[0] = async data => {
    if (!modalState.isOpened) return;
    const { name } = data;

    try {
      if (modalState.mode === 'create') {
        await createSubjectMutation({ name }).unwrap();
      } else {
        await updateSubjectMutation({ id: modalState.subject.id, name }).unwrap();
      }
      closeModal();
    } catch {
      /* empty */
    }
  };

  const subjectList = useMemo(
    () => (
      <SubjectList
        subjects={subjectData}
        isFetching={isFetching}
        isError={isGetSubjectsError}
        hasMethodistPermissions={hasMethodistPermissions}
        onEditSubject={openEditingSubject}
        onDeleteSubject={deleteSubjectMutation}
      />
    ),
    [deleteSubjectMutation, isFetching, isGetSubjectsError, hasMethodistPermissions, openEditingSubject, subjectData],
  );

  const modalTitleText = modalState.isOpened ? modalTitleTextByMode[modalState.mode] : '';
  const formServerError = (() => {
    if (!modalState.isOpened) return null;
    if (modalState.mode === 'create') return creatingError && String(creatingError);
    if (modalState.mode === 'edit') return updatingError && String(updatingError);
  })();

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Список предметов</h3>

      {hasMethodistPermissions && (
        <Button className='self-end' onClick={openCreatingSubject}>
          Создать новый предмет
        </Button>
      )}

      {subjectList}

      <Modal
        titleText={modalTitleText}
        acceptBtnText='Сохранить'
        declineBtnText='Закрыть'
        onClose={closeModal}
        isOpened={modalState.isOpened}
        formId={formId}
        onSubmit={formValues.handleSubmit(handleSubmit)}
        isLoading={isCreatingLoading || isUpdatingLoading}
      >
        <form id={formId} onSubmit={formValues.handleSubmit(handleSubmit)}>
          <Input
            labelText='Название предмета'
            placeholder='Название предмета'
            {...formValues.register('name')}
            customClass='w-full'
            error={formValues.formState.errors.name?.message}
          />
          <p className='text-[red]'>{formServerError}</p>
        </form>
      </Modal>
    </main>
  );
};
