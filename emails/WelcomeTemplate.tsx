// components/emails/welcome.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  username?: string | null;
}

const WelcomeEmail = ({ username }: WelcomeEmailProps) => {
  const previewText = `Welcome to Pixels, ${username}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white text-black my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to Pixels!
            </Heading>
            <Text className="text-sm">Hello {username},</Text>
            <Text className="text-sm">
              We`re excited to have you onboard at <span>Pixels</span>. We hope
              you enjoy your journey with us. If you have any questions or need
              assistance, feel free to reach out.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                href="https://pixels-designed.netlify.app/"
                className="text-white bg-purple-700  font-medium rounded-lg text-sm px-6 py-3 text-center mb-2"
              >
                Get started!
              </Button>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              The Pixels Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
