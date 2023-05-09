import React from "react";

const NoContextMenuImage = ({ src, alt, ...restProps }) => (
  <img
    src={src}
    alt={alt}
    onContextMenu={(e) => e.preventDefault()}
    {...restProps}
  />
);

export default NoContextMenuImage;
