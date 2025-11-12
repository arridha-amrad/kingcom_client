type Props = {
  name: string;
  specs: string;
};

export default function Specifications({ name, specs }: Props) {
  // const items = data.specification.split('\n').map((v) => v.replace('-', ''));
  return (
    <div className="py-4">
      <h1 className="font-bold text-2xl pb-4">{name}</h1>
      <p>{specs}</p>
    </div>
  );
}
