import { FC } from 'react';

import { CreateEditTestForm, type TestFormValues } from '@/components/Tests';

const defaultFormValues: TestFormValues = {
  name: '',
  startTime: new Date(),
  endTime: new Date(),
  hidden: false,
  isRandomAnswers: false,
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

export const CreateTestPageContainer: FC = () => {
  const handleSave = async (data: TestFormValues) => {
    console.log('data', data);
  };

  return (
    <main className='flex flex-col items-center flex-grow-[1]'>
      <h3 className='text-2xl mt-2 mb-5 text-center'>Creating a new test</h3>

      <CreateEditTestForm defaultFormValues={defaultFormValues} mode='create' onSave={handleSave} />
    </main>
  );
};
