/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";

export default function CustomHead({
  title = "Personality Test",
  description = "You probably have a hunch about which one you are, but why not take this quiz and double-check? Knowing your traits will help you figure out how you can best fit and function in the workplace and the world.",
  url = process.env.NEXT_PUBLIC_SITE_DOMAIN,
  image = "/img/personality-test.jpg",
  creator = "@creator",
}) {
  return (
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <title key="title">{title}</title>
      <link key="canonical" rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta
        name="image"
        content={process.env.NEXT_PUBLIC_SITE_DOMAIN + image}
      />

      <meta name="og:type" property="og:type" content="website" />
      <meta name="og:url" property="og:url" content={url} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta name="og:image" property="og:image" content={image} />

      <meta name="twitter:dnt" content="on" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
