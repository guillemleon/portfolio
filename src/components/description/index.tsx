const Description = ({ text }: { text: string }) => {
  return <p dangerouslySetInnerHTML={{ __html: text?.replace(/\r\n|\n/g, '<br />') }} />;
};

export default Description;
