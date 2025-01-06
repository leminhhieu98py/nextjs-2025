type Props = {
  params: Promise<{ mealId: string }>;
};

const MealDetail = async ({ params }: Props) => {
  const { mealId } = await params;

  return <div>MealDetail: {mealId}</div>;
};

export default MealDetail;
