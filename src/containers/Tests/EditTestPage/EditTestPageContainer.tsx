import { FC, useMemo } from 'react';

import { CreateEditTestForm, type TestFormValues } from '@/components/Tests';
import { useGetTestQuery, useUpdateTestMutation } from '@/store/api/testApi';
import { CreateTestDto, UpdateTestDto } from '@/types';

import { fromTestToTestFormFields, isEditTestDto } from './formHelper';

type EditTestPageContainerProps = { testId: number };

export const EditTestPageContainer: FC<EditTestPageContainerProps> = ({ testId }) => {
  const { currentData: testData, isFetching: isTestLoading } = useGetTestQuery(testId);
  const [updateTestMutation, { isLoading: isUpdatingTestLoading }] = useUpdateTestMutation();

  const handleSave = async (data: CreateTestDto | UpdateTestDto) => {
    if (isEditTestDto(data)) {
      await updateTestMutation(data).unwrap();
      alert(`Test "${data.name}" is updated!`);
    }
  };

  const defaultFields = useMemo<TestFormValues | undefined>(
    () => fromTestToTestFormFields(testData),
    [testData, isTestLoading],
  );

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Editing a test</h3>

      {isTestLoading && <div>Loading...</div>}

      {defaultFields && (
        <CreateEditTestForm
          defaultFormValues={defaultFields}
          mode='edit'
          isLoading={isUpdatingTestLoading}
          onSave={handleSave}
        />
      )}
    </main>
  );
};
