import { Button } from "@react-email/button";
import { Html } from "@react-email/html";

export function Email({ url }: { url: string }) {
  return (
    <Html lang="en">
      <Button href={url}>Localhost</Button>
    </Html>
  );
}

export default Email;
