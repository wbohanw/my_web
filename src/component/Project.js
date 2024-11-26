import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/robohack.jpg";
import projImg2 from "../assets/img/16bitCPU.png";
import projImg3 from "../assets/img/trucking.png";
import projImg4 from "../assets/img/211Robot.png";
import projImg5 from "../assets/img/assetplus.png";
import projImg6 from "../assets/img/Claw.jpg";
import mazeimg from "../assets/img/game2.png";
import cyberimg from "../assets/img/cyber.png";
import punchimg from "../assets/img/punch.png";
import cityimg from "../assets/img/citysw.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import Pointer from "../pointer/Pointer.tsx";

export const Projects = () => {
  const projectCategories = [
    {
      key: "first",
      title: "Robot Design",
      description: "Robots Designs, consist robot structures including components and programming boards, boards are mostly ESPs or Arduinos which powered by C++",
      projects: [
        {
          title: "Claw Hand Robot",
          description: "Robot used to setup the rocket onto the platform, Controlled by self designed web-interface",
          imgUrl: projImg6,
        },
        {
          title: "Firefighter",
          description: "Mcgill Robohacks 2023 1st Place,\n trace the fire with sensor and putout with water",
          imgUrl: projImg1,
        },
        {
          title: "Cube Stack Robot",
          description: "Self navigating towards the dropoff point and release the corresponding color cube",
          imgUrl: projImg4,
        },
        {
          title: "City Sweeper",
          description: "An automated caterpillar robot equipped with a sweeping mechanism, capable of classifying waste autonomously.",
          imgUrl: cityimg,
        },
      ],
    },
    {
      key: "second",
      title: "Software Design",
      description: "Software Designs, consist of frontend and backend, frontends are mostly in react",
      projects: [
        {
          title: "AssetPlus",
          description: "Hotel management interface, allows hotel stuff to register users, maintain hotel assets and etc",
          imgUrl: projImg5,
        },
        {
          title: "Trucking",
          description: "A Software matches the trucker with broker and max the profit",
          imgUrl: projImg3,
        },
        {
          title: "Punch My Prof",
          description: "Hand Interaction Game with Unity, utilize Meshy API through generate 3D prof object through 2D pictures",
          imgUrl: punchimg,
        },
        {
          title: "CyberSight",
          description: "Vision AI to guide users in real-time to find and confirm the acquisition of objects using visual and auditory feedback through mobile devices.",
          imgUrl: cyberimg,
        },
        {
          title: "Maze Game",
          description: "Imployed assembly and c to control little \"&\" to escape.",
          imgUrl: mazeimg,
        },
      ],
    },
    {
      key: "third",
      title: "Hardware Design",
      description: "Hardware Designs, mostly chip and processer related",
      projects: [
        {
          title: "16 bit CPU",
          description: "can process 16bits instructions from PC",
          imgUrl: projImg2,
        },
      ],
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>"I had a good team" ---Bohan</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      {projectCategories.map((category) => (
                        <Nav.Item key={category.key}>
                          <Nav.Link eventKey={category.key}>{category.title}</Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      {projectCategories.map((category) => (
                        <Tab.Pane eventKey={category.key} key={category.key}>
                          <Row>
                            {/* <Pointer /> */}
                            {category.projects.map((project, index) => (
                              <ProjectCard key={index} {...project} />
                            ))}
                          </Row>
                          <p>{category.description}</p>
                        </Tab.Pane>
                      ))}
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
};