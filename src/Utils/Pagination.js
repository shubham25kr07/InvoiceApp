const Page = ({ names, loading }) => {
  return (
    <div>
      <ul>
        {names.map((item, index) => {
          return <li key={index}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Page;
