import QuestionItem from './QuestionItem';
import type { Question } from '@/types';

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  if (!questions || questions.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No questions found.</p>;
  }

  return (
    <div className="space-y-6">
      {questions.map(question => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
