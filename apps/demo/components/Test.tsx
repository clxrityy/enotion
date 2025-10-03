export const Test = ({
  context
}: {
  context: {
    value: string
  }
}) => {

  return <div>test {context.value}</div>;
}
