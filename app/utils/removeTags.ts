const removeTags = (message: string) => {
  return message.replace(/(<([^>]+)>)/gi, "");
};

export default removeTags;
