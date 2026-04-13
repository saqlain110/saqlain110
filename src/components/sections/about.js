import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import MeImage from '../../images/me.png';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        mix-blend-mode: multiply;
        filter: grayscale(100%) contrast(1);
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      filter: none;
      mix-blend-mode: normal;
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React.js',
    'React Native',
    'Next.js',
    'Tailwind CSS',
    'ShadCN UI',
    'Node.js',
    'MongoDB',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I&apos;m Mohammad Saqlain, a Senior Frontend Engineer with over 5.5 years of
              experience architecting scalable web and mobile applications. My expertise is deeply
              rooted in the React and React Native ecosystems, where I focus on bridging the gap
              between complex backend systems and seamless, high-performance user experiences.
            </p>

            <p>
              Throughout my career, I&apos;ve had the privilege of working within large-scale
              corporate environments and fast-paced labs. Currently, at{' '}
              <a href="https://koderlabs.com/">Koderlabs</a>, my mission is to build inclusive,
              accessible, and maintainable digital products. I believe that being a Senior Engineer
              goes beyond just writing code, I am passionate about performance optimization and
              mentoring junior developers to ensure our teams ship high-quality systems that stand
              the test of time.
            </p>

            <p>What I bring to the table:</p>

            <ul>
              <li>
                <strong>Real-Time Collaboration:</strong> I specialize in solving complex
                synchronization challenges, such as implementing CRDTs (Yjs) via custom SignalR
                providers to enable Google Docs-style collaborative editing in RFP platforms.
              </li>
              <br />
              <li>
                <strong>Mobile Mastery:</strong> I deep-dive into native Java/Kotlin when necessary
                to solve unique UX challenges in React Native, such as manipulating Android Power
                Manager settings for mission-critical navigation apps.
              </li>
              <br />
              <li>
                <strong>Performance First:</strong> Whether it&apos;s binary-to-base64 encoding
                pipelines or update batching logic, I build with the network and the end-user&apos;s
                device in mind.
              </li>
            </ul>

            <p>
              Today, I continue to push the boundaries of what&apos;s possible on the frontend,
              ensuring every pixel is accessible and every interaction is fluid.
            </p>

            <p>Here are a few technologies I&apos;ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <img className="img" src={MeImage} width={500} quality={95} alt="Headshot" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
