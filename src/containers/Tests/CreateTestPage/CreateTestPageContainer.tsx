import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Routes } from '@/components/Navbar/navRoutes';
import { CreateEditTestForm, type TestFormValues } from '@/components/Tests';
import { useCreateTestMutation } from '@/store/api/testApi';
import { CreateTestDto, UpdateTestDto } from '@/types';

const startTime = new Date();
const endTime = new Date(startTime);
endTime.setDate(endTime.getDate() + 1);
const defaultFormValues: TestFormValues = {
  name: '',
  startTime,
  endTime,
  hidden: false,
  isRandomAnswers: false,
  duration: 500000,
  questions: [
    {
      text: '',
      type: 'single',
      answers: [
        { isRight: true, text: '' },
        { isRight: false, text: '' },
      ],
    },
  ],
};

const isCreateTestDto = (data: CreateTestDto | UpdateTestDto): data is CreateTestDto => !('id' in data);

export const CreateTestPageContainer: FC = () => {
  const router = useRouter();
  const [createTestMutation, { isLoading: isCreatingTestLoading }] = useCreateTestMutation();

  const handleSave = async (data: CreateTestDto | UpdateTestDto) => {
    if (isCreateTestDto(data)) {
      const { id: testId } = await createTestMutation(data).unwrap();
      alert(`Test "${data.name}" is created!`);
      router.push(`${Routes.TESTS}/edit/${testId}`);
    }
  };

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Creating a new test</h3>

      <CreateEditTestForm
        defaultFormValues={defaultFormValues}
        mode='create'
        isLoading={isCreatingTestLoading}
        onSave={handleSave}
      />
    </main>
  );
};
