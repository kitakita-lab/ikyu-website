import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/ArrowLink";

type CtaLink = { href: string; label: string; external?: boolean };

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  links: CtaLink[];
  tone?: "base" | "soft";
};

/**
 * 各ページの結びに置く「次の一歩」。
 * ページの文脈に応じて誘導先(Instagram / minne / 各ページ)を変える。
 */
export function CtaBand({ eyebrow, title, body, links, tone = "soft" }: Props) {
  return (
    <Section tone={tone} space="compact">
      <Container width="narrow" className="text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h2" className="mt-4">
          {title}
        </Heading>
        <p className="mt-5 text-[14px] leading-[2.2] text-ink-soft md:text-[15px]">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {links.map((link) => (
            <ArrowLink key={link.href} href={link.href} external={link.external}>
              {link.label}
            </ArrowLink>
          ))}
        </div>
      </Container>
    </Section>
  );
}
