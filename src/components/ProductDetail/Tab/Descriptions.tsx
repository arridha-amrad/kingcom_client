type Props = {
  name: string;
  description: string;
};

export default function Description({ description, name }: Props) {
  return (
    <div className="py-4">
      <h1 className="font-bold text-2xl pb-4">{name}</h1>
      <p className="whitespace-pre-line">{description}</p>
    </div>
  );
}
