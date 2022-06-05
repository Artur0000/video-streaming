export const Link = ({ children, href }) => {
  const onClick = (event) => {
    event.stopPropagation();
    window.bridge.openLink(href);
  };
  return (
    <span onClickCapture={onClick}>
      <a href="./">{children}</a>
    </span>
  );
};
