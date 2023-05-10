'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Metadata } from 'next';
import { FC, memo, useMemo, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components/shared';
import { SubjectList } from '@/components/Subjects';
import { useMethods } from '@/hooks/useMethods';
import { useCheckAuthQuery } from '@/store/api/authApi';
import {
  useCreateTestMutation,
  useDeleteTestMutation,
  useGetTestsQuery,
  useUpdateTestMutation,
} from '@/store/api/testApi';
import { Test } from '@/types';

import { validationSchema } from './validation';

type ModalState =
  | {
      isOpened: false;
    }
  | { isOpened: true; mode: 'create' }
  | { isOpened: true; mode: 'edit'; test: Test };

const modalTitleTextByMode = {
  create: 'Создание теста',
  edit: 'Редактирование теста',
};

const formId = 'tests-form';

export const TestsPageContainer: FC = () => {
  const formValues = useForm<{ name: string }>({
    defaultValues: { name: '' },
    resolver: yupResolver(validationSchema),
  });

  const [modalState, { openCreatingTest, openEditingTest, closeModal }] = useMethods({
    initialState: {
      isOpened: false,
    } as ModalState,
    methods: {
      openCreatingTest: _ => ({
        isOpened: true,
        mode: 'create',
      }),
      openEditingTest: (_, test: Test) => {
        formValues.setValue('name', test.name);
        return { isOpened: true, mode: 'edit', test };
      },
      closeModal: _ => {
        formValues.reset();
        return { isOpened: false };
      },
    },
  });

  const { currentData: testData, isFetching: isGetTestFetching, isError: isGetTestsError } = useGetTestsQuery();
  const [createTestMutation, { isLoading: isCreatingLoading, error: creatingError }] = useCreateTestMutation();
  const [updateTestMutation, { isLoading: isUpdatingLoading, error: updatingError }] = useUpdateTestMutation();
  const [deleteTestMutation, { isLoading: isDeleteTestLoading }] = useDeleteTestMutation();
  const { data: userInfo } = useCheckAuthQuery();

  const isNotStudent = userInfo?.role !== 'Student';

  const isFetching = isDeleteTestLoading || isGetTestFetching;

  const handleSubmit: Parameters<typeof formValues.handleSubmit>[0] = async data => {
    if (!modalState.isOpened) return;
    const { name } = data;

    try {
      if (modalState.mode === 'create') {
        await createTestMutation({ name }).unwrap();
      } else {
        await updateTestMutation({ id: modalState.test.id, name }).unwrap();
      }
      closeModal();
    } catch {
      /* empty */
    }
  };

  const testList = useMemo(
    () => (
      <SubjectList
        subjects={testData}
        isFetching={isFetching}
        isError={isGetTestsError}
        isNotStudent={isNotStudent}
        onEditSubject={openEditingTest}
        onDeleteSubject={deleteTestMutation}
      />
    ),
    [deleteTestMutation, isFetching, isGetTestsError, isNotStudent, openEditingTest, testData],
  );

  const modalTitleText = modalState.isOpened ? modalTitleTextByMode[modalState.mode] : '';
  const formServerError = (() => {
    if (!modalState.isOpened) return null;
    if (modalState.mode === 'create') return creatingError && String(creatingError);
    if (modalState.mode === 'edit') return updatingError && String(updatingError);
  })();

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5'>Tests list</h3>

      <Button className='self-end' onClick={openCreatingTest}>
        Create new test
      </Button>

      {testList}

      <Modal
        titleText={modalTitleText}
        acceptBtnText='Save'
        declineBtnText='Close'
        onClose={closeModal}
        isOpened={modalState.isOpened}
        formId={formId}
        onSubmit={formValues.handleSubmit(handleSubmit)}
        isLoading={isCreatingLoading || isUpdatingLoading}
      >
        <form id={formId} onSubmit={formValues.handleSubmit(handleSubmit)}>
          <Input
            labelText='Название теста'
            placeholder='Название теста'
            {...formValues.register('name')}
            error={formValues.formState.errors.name?.message}
          />
          <p className='text-[red]'>{formServerError}</p>
        </form>
      </Modal>
    </main>
  );
};
