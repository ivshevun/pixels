import SmallText from "@/app/auth/components/SmallText";
import logo from "@/public/logo.svg";
import {
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

const ForgotPasswordTemplate = ({
  username,
  token,
}: {
  username: string;
  token: string;
}) => {
  return (
    <Html>
      <Preview>Forgot password</Preview>
      <Tailwind>
        <Body className="bg-white text-black my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Img className="w-24 mx-auto" src={logo} />
            <Heading>Hi, {username}!</Heading>
            <SmallText>Here are your password reset instructions.</SmallText>
            <Hr />
            <Text>
              A request to reset your Pixels password has been made. If you did
              not make this request, simply ignore this email. If you did make
              this request, please reset your password:
            </Text>
            <Button
              href={`http://localhost:3000/auth/forgot-password/${token}`}
              className="bg-gray-900 text-center text-white w-full my-5 py-4 text-xl rounded-full"
            >
              Reset password
            </Button>
            <SmallText className="text-left">Cheers, Pixels Team</SmallText>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordTemplate;
