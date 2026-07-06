import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <Section>
      <Container width="narrow" className="text-center">
        <Eyebrow>404</Eyebrow>
        <Heading as="h1" className="mt-4">
          ページが見つかりませんでした。
        </Heading>
        <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
          お探しのページは、移動したか、なくなってしまったようです。
          トップページから、ゆっくりお探しください。
        </p>
        <div className="mt-9 flex justify-center">
          <ArrowLink href="/">トップページへ戻る</ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
