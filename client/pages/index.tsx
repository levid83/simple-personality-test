import Error from "next/error";
import type { NextPage } from "next";
import Layout from "../components/Layout";

import Quiz from "../components/Quiz";
import QuizService from "../services/Quiz.service";
import ErrorBoundary from "../components/ErrorBoundary";

function scrollToQuiz() {
  document.getElementById("start-quiz")?.scrollIntoView({ block: "center" });
}

const Home: NextPage = ({ errorCode, quiz }: any) => {
  const pageMeta = {
    title: "Personality Test",
  };
  return (
    <Layout pageMeta={pageMeta}>
      <section className="intro">
        <div className="background-image"></div>
        <h1>Are You More Of An Introvert Or An Extrovert?</h1>
        <a className="btn start-test" onClick={scrollToQuiz}>
          Start the test
        </a>
      </section>

      <section className="quiz-description">
        <p>
          The <a onClick={scrollToQuiz}>introvert vs extrovert</a> test bellow
          will help you to figure out where you are on the extrovert-introvert
          scale, so you can tune in to your true, inner self! Figuring out
          whether you are an introvert or an extrovert seems simple enough. We
          generally think that those who are shy and quiet are introverts, while
          people who are more talkative and outgoing are extroverts. But humans
          are complex creatures, and most people fall somewhere on the spectrum
          between the two. Understanding where you fall can help you become more
          self-aware and understand the important relationships in your life.
        </p>
        <p>
          Most of us believe that we are either an extrovert or an introvert.
          The fact is, the differences between introversion and extroversion
          aren’t so black and white. Everybody functions on either side of the
          spectrum from time to time, but humans still stick with what makes
          them feel most comfortable.
        </p>
      </section>
      <section className="quiz" id="start-quiz">
        {errorCode ? (
          <Error statusCode={errorCode} />
        ) : (
          <ErrorBoundary>
            <Quiz quiz={quiz} />
          </ErrorBoundary>
        )}
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ res }: any) {
  try {
    const data = await QuizService.getQuiz("personality-test");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=60"
    );

    return {
      props: { erroCode: null, quiz: data },
    };
  } catch (err: any) {
    return {
      props: { errorCode: err.code },
    };
  }
}
export default Home;
