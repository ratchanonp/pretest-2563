import * as React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Helmet } from "react-helmet";
import {
  Divider,
  Grid,
  Container,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import { Alert, AlertTitle } from "@material-ui/lab";
import "../css/main.css";

const font = "'Prompt', sans-serif";

const theme = createMuiTheme({
  typography: {
    h1: {
      fontWeight: "100",
      fontSize: 60,
    },
    h2: {},
    fontFamily: font,
  },
});

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

// markup
const IndexPage = ({ data }) => {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTimeP6 = 1613179800; // use UNIX timestamp in seconds
  const endTimeM3 = 1613266200; // use UNIX timestamp in seconds

  const remainingTimeP6 = endTimeP6 - stratTime;
  const remainingTimeM3 = endTimeM3 - stratTime;
  const days = Math.ceil(remainingTimeP6 / daySeconds);
  const daysDuration = days * daySeconds;
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>การสอบแข่งขันวัดความรู้ ปีการศึกษา 2563 | โรงเรียนเบญจมราชูทิศ</title>
        <meta charSet="utf-8" />
        <meta property="og:image" content="https://www.benjama.ac.th/th/wp-content/uploads/2020/11/PRETEST-2563.jpg.webp"/>
        <meta property="og:image:width" content="400" />
        <meta property="og:image:width" content="50" />
      </Helmet>

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} align="center" justify="center">
            <Img
              fixed={data.logo.childImageSharp.fixed}
              objectPosition="50% 50%"
            />
            <h1
              style={{
                textAlign: "center",
                fontSize: 36,
                fontWeight: "500px",
              }}
            >
              การสอบแข่งขันวัดความรู้
              <br />
              <span
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "100px",
                }}
              >
                โรงเรียนเบญจมราชูทิศ ปีการศึกษา 2563
              </span>
            </h1>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            align="center"
            justify="center"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <h2>ระดับชั้นประถมศึกษาปีที่ 6</h2>
            <Img fluid={data.p6.childImageSharp.fluid} />
            <Grid
              container
              spacing={3}
              align="center"
              justify="center"
              style={{ fontSize: 20, marginTop: 10 }}
            >
              {/* Days */}
              <Grid item sm={6} md={3}>
                <Grid>
                  <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#7E2E84"]]}
                    duration={daysDuration}
                    initialRemainingTime={remainingTimeP6}
                  >
                    {({ elapsedTime }) =>
                      renderTime("วัน", getTimeDays(daysDuration - elapsedTime))
                    }
                  </CountdownCircleTimer>
                </Grid>
              </Grid>
              {/* Hours */}
              <Grid item sm={6} md={3}>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#D14081"]]}
                  duration={daySeconds}
                  initialRemainingTime={remainingTimeP6 % daySeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTimeP6 - totalElapsedTime > hourSeconds,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime(
                      "ชั่วโมง",
                      getTimeHours(daySeconds - elapsedTime)
                    )
                  }
                </CountdownCircleTimer>
              </Grid>
              {/* Minutes */}
              <Grid item sm={6} md={3}>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#EF798A"]]}
                  duration={hourSeconds}
                  initialRemainingTime={remainingTimeP6 % hourSeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTimeP6 - totalElapsedTime > minuteSeconds,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime(
                      "นาที",
                      getTimeMinutes(hourSeconds - elapsedTime)
                    )
                  }
                </CountdownCircleTimer>
              </Grid>
              {/* Seconds */}
              <Grid item sm={6} md={3}>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#218380"]]}
                  duration={minuteSeconds}
                  initialRemainingTime={remainingTimeP6 % minuteSeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTimeP6 - totalElapsedTime > 0,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime("วินาที", getTimeSeconds(elapsedTime))
                  }
                </CountdownCircleTimer>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            align="center"
            justify="center"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <h2>ระดับชั้นมัธยมศึกษาปีที่ 3</h2>
            <Img fluid={data.m3.childImageSharp.fluid} />
            <Grid
              container
              spacing={3}
              align="center"
              justify="center"
              style={{ fontSize: 20, marginTop: 10 }}
            >
              {/* Days */}
              <Grid item sm={6} md={3}>
                <Grid>
                  <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#7E2E84"]]}
                    duration={daysDuration}
                    initialRemainingTime={remainingTimeM3}
                  >
                    {({ elapsedTime }) =>
                      renderTime("วัน", getTimeDays(daysDuration - elapsedTime))
                    }
                  </CountdownCircleTimer>
                </Grid>
              </Grid>
              {/* Hours */}
              <Grid item sm={6} md={3}>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#D14081"]]}
                  duration={daySeconds}
                  initialRemainingTime={remainingTimeM3 % daySeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTimeM3 - totalElapsedTime > hourSeconds,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime(
                      "ชั่วโมง",
                      getTimeHours(daySeconds - elapsedTime)
                    )
                  }
                </CountdownCircleTimer>
              </Grid>
              {/* Minutes */}
              <Grid item sm={6} md={3}>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#EF798A"]]}
                  duration={hourSeconds}
                  initialRemainingTime={remainingTimeM3 % hourSeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTimeM3 - totalElapsedTime > minuteSeconds,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime(
                      "นาที",
                      getTimeMinutes(hourSeconds - elapsedTime)
                    )
                  }
                </CountdownCircleTimer>
              </Grid>
              {/* Seconds */}
              <Grid item sm={6} md={3}>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#218380"]]}
                  duration={minuteSeconds}
                  initialRemainingTime={remainingTimeM3 % minuteSeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTimeM3 - totalElapsedTime > 0,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime("วินาที", getTimeSeconds(elapsedTime))
                  }
                </CountdownCircleTimer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 30 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} align="center" justify="center">
            <h2>แนวปฏิบัติในการสอบ</h2>
          </Grid>
          <Grid item xs={12} sm={6} style={{ fontSize: 20 }}>
            <Alert severity="warning">
              <AlertTitle>
                <strong>บัตรประจำตัวประชาชน</strong>
              </AlertTitle>
              นักเรียนต้องนำ <strong>บัตรประจำตัวประชาชน </strong>
              หรือ <strong>บัตรประจำตัวนักเรียน</strong>{" "}
              หรือเอกสารที่ทางราชการออกให้ที่มีรูปถ่าย
              เพื่อให้กรรมการคุมสอบตรวจสอบก่อนเข้าห้องสอบ
            </Alert>
            <Alert severity="warning" style={{ marginTop: 10 }}>
              <AlertTitle>
                <strong>อุปกรณ์การสอบ</strong>
              </AlertTitle>
              นักเรียนต้องนำอุปกรณ์การสอบ ได้แก่ ดินสอ 2B กบเหลาดินสอ ยางลบ
              และปากกา
            </Alert>
            <Alert severity="error" style={{ marginTop: 10 }}>
              <AlertTitle>
                <strong>การเข้าในโรงเรียน</strong>
              </AlertTitle>
              นักเรียนต้องผ่านจุดคัดกรองที่กำหนด บริเวณทางเข้า{" "}
              <strong>ประตู 1 </strong>เท่านั้น
            </Alert>
            <Alert severity="success" style={{ marginTop: 10 }}>
              <AlertTitle>
                <strong>การเข้าห้องสอบ</strong>
              </AlertTitle>
              หลังจากผ่านจุดคัดกรอง นักเรียนไม่ต้องเข้าแถว
              ให้ไปรอที่หน้าห้องสอบได้ทันที
            </Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Alert severity="warning">
              <AlertTitle>
                <strong>Social Distancing</strong>
              </AlertTitle>
              นักเรียนต้องสวมหน้ากากอนามัยหรือหน้ากากผ้า ตลอดเวลา
              และเว้นระยะห่างทางสังคม
              เพื่อป้องกันการแพร่ระบาดของโรคติดเชื้อไวรัส โคโรนา 2019 (COVID-19)
            </Alert>
            <Alert severity="error" style={{ marginTop: 10 }}>
              <AlertTitle>
                <strong>ผู้ปกครอง</strong>
              </AlertTitle>
              <strong>ไม่อนุญาต! </strong>ให้ผู้ปกครองเข้ามาภายในบริวณโรงเรียน
            </Alert>
            <Alert severity="info" style={{ marginTop: 10 }}>
              <AlertTitle>
                <strong>สอบถาม</strong>
              </AlertTitle>
              กรณีที่นักเรียนหรือผู้ปกครองท่านใดมีปัญหาหรือ ข้อสงสัยในวันสอบ
              สามารถติดต่อสอบถามได้ที่ จุดประชาสัมพันบริเวณทางเข้าประตู 1
              หรือบริเวณหอประชุมลานเข้าแถว
              หรือบริเวณเต้นท์ประชาสัมพันธ์หน้าอาคาร 6
            </Alert>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 30 }} />
        <iframe
          style={{ marginTop: 30 }}
          width="100%"
          height="720"
          src="https://www.youtube-nocookie.com/embed/86rmsGYJoQw"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ fontSize: 16, textAlign: "center" }}>© 2020 Ratchanon Panmas </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export const query = graphql`
  query {
    p6: file(relativePath: { eq: "table-p6-1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    m3: file(relativePath: { eq: "table-m3-1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    logo: file(relativePath: { eq: "icon.png" }) {
      childImageSharp {
        fixed(height: 250) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`;

export default IndexPage;
