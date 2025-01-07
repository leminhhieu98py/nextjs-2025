type Props = {
  params: { slug: string };
};

const MealDetail = ({ params }: Props) => {
  const { slug } = params;

  return <div>MealDetail: {slug}</div>;
};

export default MealDetail;
