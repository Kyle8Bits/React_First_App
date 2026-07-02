import {
  LinkedinLogo,
  FacebookLogo,
  GithubLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kylemai261/",
    Icon: LinkedinLogo,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/kyle.mai261/",
    Icon: FacebookLogo,
  },
  {
    label: "GitHub",
    href: "https://github.com/Kyle8Bits",
    Icon: GithubLogo,
  },
  {
    label: "Gmail",
    href: "mailto:khoamaidang2611@gmail.com",
    Icon: EnvelopeSimple,
  },
];

const SocialLinks = () => {
  return (
    <div className="flex gap-3">
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          {...(href.startsWith("mailto:")
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
          aria-label={label}
          className="p-3 border border-text/15 rounded-full text-text/60 hover:text-primary hover:border-primary hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
        >
          <Icon size={20} weight="regular" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
