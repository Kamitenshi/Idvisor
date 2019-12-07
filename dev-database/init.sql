--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2019-11-13 13:45:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16395)
-- Name: schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA schema;


ALTER SCHEMA schema OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16401)
-- Name: admin; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.admin (
    email character varying(100) NOT NULL
);


ALTER TABLE schema.admin OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16483)
-- Name: advisor; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.advisor (
    email character varying(100) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    is_chief_advisor boolean DEFAULT false NOT NULL
);


ALTER TABLE schema.advisor OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16439)
-- Name: center_of_interest; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.center_of_interest (
    name character varying(150) NOT NULL
);


ALTER TABLE schema.center_of_interest OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16514)
-- Name: curriculum; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.curriculum (
    id bigint NOT NULL,
    university character varying(150),
    name character varying(100)
);


ALTER TABLE schema.curriculum OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16527)
-- Name: curriculum_by_skill; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.curriculum_by_skill (
    name_skill character varying(150) NOT NULL,
    id_curriculum bigint NOT NULL
);


ALTER TABLE schema.curriculum_by_skill OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16525)
-- Name: curriculum_by_skill_id_curriculum_seq; Type: SEQUENCE; Schema: schema; Owner: postgres
--

CREATE SEQUENCE schema.curriculum_by_skill_id_curriculum_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE schema.curriculum_by_skill_id_curriculum_seq OWNER TO postgres;

--
-- TOC entry 2920 (class 0 OID 0)
-- Dependencies: 214
-- Name: curriculum_by_skill_id_curriculum_seq; Type: SEQUENCE OWNED BY; Schema: schema; Owner: postgres
--

ALTER SEQUENCE schema.curriculum_by_skill_id_curriculum_seq OWNED BY schema.curriculum_by_skill.id_curriculum;


--
-- TOC entry 212 (class 1259 OID 16512)
-- Name: curriculum_id_seq; Type: SEQUENCE; Schema: schema; Owner: postgres
--

CREATE SEQUENCE schema.curriculum_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE schema.curriculum_id_seq OWNER TO postgres;

--
-- TOC entry 2921 (class 0 OID 0)
-- Dependencies: 212
-- Name: curriculum_id_seq; Type: SEQUENCE OWNED BY; Schema: schema; Owner: postgres
--

ALTER SEQUENCE schema.curriculum_id_seq OWNED BY schema.curriculum.id;


--
-- TOC entry 205 (class 1259 OID 16421)
-- Name: skill; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.skill (
    name character varying(150) NOT NULL
);


ALTER TABLE schema.skill OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16411)
-- Name: student; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.student (
    email character varying(100) NOT NULL,
    adress character varying(200),
    age integer,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL
);


ALTER TABLE schema.student OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16494)
-- Name: students_by_advisors; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.students_by_advisors (
    email_student character varying(100) NOT NULL,
    email_advisor character varying(100) NOT NULL
);


ALTER TABLE schema.students_by_advisors OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16470)
-- Name: students_by_center_of_interest; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.students_by_center_of_interest (
    email_student character varying(100) NOT NULL,
    name_center_interest character varying(150) NOT NULL
);


ALTER TABLE schema.students_by_center_of_interest OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16543)
-- Name: students_by_curriculums; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.students_by_curriculums (
    email_student character varying(100) NOT NULL,
    id_curriculum bigint NOT NULL
);


ALTER TABLE schema.students_by_curriculums OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16541)
-- Name: students_by_curriculums_id_curriculum_seq; Type: SEQUENCE; Schema: schema; Owner: postgres
--

CREATE SEQUENCE schema.students_by_curriculums_id_curriculum_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE schema.students_by_curriculums_id_curriculum_seq OWNER TO postgres;

--
-- TOC entry 2922 (class 0 OID 0)
-- Dependencies: 216
-- Name: students_by_curriculums_id_curriculum_seq; Type: SEQUENCE OWNED BY; Schema: schema; Owner: postgres
--

ALTER SEQUENCE schema.students_by_curriculums_id_curriculum_seq OWNED BY schema.students_by_curriculums.id_curriculum;


--
-- TOC entry 207 (class 1259 OID 16457)
-- Name: students_by_skills; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.students_by_skills (
    email_student character varying(100) NOT NULL,
    name_skill character varying(150) NOT NULL
);


ALTER TABLE schema.students_by_skills OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16507)
-- Name: university; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema.university (
    name character varying(150) NOT NULL
);


ALTER TABLE schema.university OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16396)
-- Name: user; Type: TABLE; Schema: schema; Owner: postgres
--

CREATE TABLE schema."user" (
    email character varying(100) NOT NULL,
    role character varying(50) NOT NULL,
    password character varying(150) NOT NULL
);


ALTER TABLE schema."user" OWNER TO postgres;

--
-- TOC entry 2740 (class 2604 OID 16517)
-- Name: curriculum id; Type: DEFAULT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.curriculum ALTER COLUMN id SET DEFAULT nextval('schema.curriculum_id_seq'::regclass);


--
-- TOC entry 2741 (class 2604 OID 16530)
-- Name: curriculum_by_skill id_curriculum; Type: DEFAULT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.curriculum_by_skill ALTER COLUMN id_curriculum SET DEFAULT nextval('schema.curriculum_by_skill_id_curriculum_seq'::regclass);


--
-- TOC entry 2742 (class 2604 OID 16546)
-- Name: students_by_curriculums id_curriculum; Type: DEFAULT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_curriculums ALTER COLUMN id_curriculum SET DEFAULT nextval('schema.students_by_curriculums_id_curriculum_seq'::regclass);


--
-- TOC entry 2900 (class 0 OID 16401)
-- Dependencies: 203
-- Data for Name: admin; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.admin (email) FROM stdin;
\.


--
-- TOC entry 2906 (class 0 OID 16483)
-- Dependencies: 209
-- Data for Name: advisor; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.advisor (email, first_name, last_name, is_chief_advisor) FROM stdin;
\.


--
-- TOC entry 2903 (class 0 OID 16439)
-- Dependencies: 206
-- Data for Name: center_of_interest; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.center_of_interest (name) FROM stdin;
\.


--
-- TOC entry 2910 (class 0 OID 16514)
-- Dependencies: 213
-- Data for Name: curriculum; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.curriculum (id, university, name) FROM stdin;
\.


--
-- TOC entry 2912 (class 0 OID 16527)
-- Dependencies: 215
-- Data for Name: curriculum_by_skill; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.curriculum_by_skill (name_skill, id_curriculum) FROM stdin;
\.


--
-- TOC entry 2902 (class 0 OID 16421)
-- Dependencies: 205
-- Data for Name: skill; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.skill (name) FROM stdin;
\.


--
-- TOC entry 2901 (class 0 OID 16411)
-- Dependencies: 204
-- Data for Name: student; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.student (email, adress, age, first_name, last_name) FROM stdin;
\.


--
-- TOC entry 2907 (class 0 OID 16494)
-- Dependencies: 210
-- Data for Name: students_by_advisors; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.students_by_advisors (email_student, email_advisor) FROM stdin;
\.


--
-- TOC entry 2905 (class 0 OID 16470)
-- Dependencies: 208
-- Data for Name: students_by_center_of_interest; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.students_by_center_of_interest (email_student, name_center_interest) FROM stdin;
\.


--
-- TOC entry 2914 (class 0 OID 16543)
-- Dependencies: 217
-- Data for Name: students_by_curriculums; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.students_by_curriculums (email_student, id_curriculum) FROM stdin;
\.


--
-- TOC entry 2904 (class 0 OID 16457)
-- Dependencies: 207
-- Data for Name: students_by_skills; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.students_by_skills (email_student, name_skill) FROM stdin;
\.


--
-- TOC entry 2908 (class 0 OID 16507)
-- Dependencies: 211
-- Data for Name: university; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema.university (name) FROM stdin;
\.


--
-- TOC entry 2899 (class 0 OID 16396)
-- Dependencies: 202
-- Data for Name: user; Type: TABLE DATA; Schema: schema; Owner: postgres
--

COPY schema."user" (email, role, password) FROM stdin;
\.


--
-- TOC entry 2923 (class 0 OID 0)
-- Dependencies: 214
-- Name: curriculum_by_skill_id_curriculum_seq; Type: SEQUENCE SET; Schema: schema; Owner: postgres
--

SELECT pg_catalog.setval('schema.curriculum_by_skill_id_curriculum_seq', 1, false);


--
-- TOC entry 2924 (class 0 OID 0)
-- Dependencies: 212
-- Name: curriculum_id_seq; Type: SEQUENCE SET; Schema: schema; Owner: postgres
--

SELECT pg_catalog.setval('schema.curriculum_id_seq', 1, false);


--
-- TOC entry 2925 (class 0 OID 0)
-- Dependencies: 216
-- Name: students_by_curriculums_id_curriculum_seq; Type: SEQUENCE SET; Schema: schema; Owner: postgres
--

SELECT pg_catalog.setval('schema.students_by_curriculums_id_curriculum_seq', 1, false);


--
-- TOC entry 2746 (class 2606 OID 16405)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (email);


--
-- TOC entry 2754 (class 2606 OID 16488)
-- Name: advisor advisor_pkey; Type: CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.advisor
    ADD CONSTRAINT advisor_pkey PRIMARY KEY (email);


--
-- TOC entry 2752 (class 2606 OID 16443)
-- Name: center_of_interest center_of_interest_pkey; Type: CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.center_of_interest
    ADD CONSTRAINT center_of_interest_pkey PRIMARY KEY (name);


--
-- TOC entry 2758 (class 2606 OID 16519)
-- Name: curriculum curriculum_pkey; Type: CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.curriculum
    ADD CONSTRAINT curriculum_pkey PRIMARY KEY (id);


--
-- TOC entry 2750 (class 2606 OID 16425)
-- Name: skill skill_pkey; Type: CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.skill
    ADD CONSTRAINT skill_pkey PRIMARY KEY (name);


--
-- TOC entry 2748 (class 2606 OID 16415)
-- Name: student student_pkey; Type: CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (email);


--
-- TOC entry 2756 (class 2606 OID 16511)
-- Name: university university_pkey; Type: CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.university
    ADD CONSTRAINT university_pkey PRIMARY KEY (name);


--
-- TOC entry 2744 (class 2606 OID 16400)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (email);


--
-- TOC entry 2759 (class 2606 OID 16406)
-- Name: admin admin_email_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.admin
    ADD CONSTRAINT admin_email_fkey FOREIGN KEY (email) REFERENCES schema."user"(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2765 (class 2606 OID 16489)
-- Name: advisor advisor_email_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.advisor
    ADD CONSTRAINT advisor_email_fkey FOREIGN KEY (email) REFERENCES schema."user"(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2770 (class 2606 OID 16536)
-- Name: curriculum_by_skill curriculum_by_skill_id_curriculum_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.curriculum_by_skill
    ADD CONSTRAINT curriculum_by_skill_id_curriculum_fkey FOREIGN KEY (id_curriculum) REFERENCES schema.curriculum(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2769 (class 2606 OID 16531)
-- Name: curriculum_by_skill curriculum_by_skill_name_skill_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.curriculum_by_skill
    ADD CONSTRAINT curriculum_by_skill_name_skill_fkey FOREIGN KEY (name_skill) REFERENCES schema.skill(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2768 (class 2606 OID 16520)
-- Name: curriculum curriculum_university_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.curriculum
    ADD CONSTRAINT curriculum_university_fkey FOREIGN KEY (university) REFERENCES schema.university(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2760 (class 2606 OID 16416)
-- Name: student student_email_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.student
    ADD CONSTRAINT student_email_fkey FOREIGN KEY (email) REFERENCES schema."user"(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2767 (class 2606 OID 16502)
-- Name: students_by_advisors students_by_advisors_email_advisor_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_advisors
    ADD CONSTRAINT students_by_advisors_email_advisor_fkey FOREIGN KEY (email_advisor) REFERENCES schema.advisor(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2766 (class 2606 OID 16497)
-- Name: students_by_advisors students_by_advisors_email_student_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_advisors
    ADD CONSTRAINT students_by_advisors_email_student_fkey FOREIGN KEY (email_student) REFERENCES schema.student(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2763 (class 2606 OID 16473)
-- Name: students_by_center_of_interest students_by_center_of_interest_email_student_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_center_of_interest
    ADD CONSTRAINT students_by_center_of_interest_email_student_fkey FOREIGN KEY (email_student) REFERENCES schema.student(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2764 (class 2606 OID 16478)
-- Name: students_by_center_of_interest students_by_center_of_interest_name_center_interest_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_center_of_interest
    ADD CONSTRAINT students_by_center_of_interest_name_center_interest_fkey FOREIGN KEY (name_center_interest) REFERENCES schema.center_of_interest(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2771 (class 2606 OID 16547)
-- Name: students_by_curriculums students_by_curriculums_email_student_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_curriculums
    ADD CONSTRAINT students_by_curriculums_email_student_fkey FOREIGN KEY (email_student) REFERENCES schema.student(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2772 (class 2606 OID 16552)
-- Name: students_by_curriculums students_by_curriculums_id_curriculum_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_curriculums
    ADD CONSTRAINT students_by_curriculums_id_curriculum_fkey FOREIGN KEY (id_curriculum) REFERENCES schema.curriculum(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2761 (class 2606 OID 16460)
-- Name: students_by_skills students_by_skills_email_student_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_skills
    ADD CONSTRAINT students_by_skills_email_student_fkey FOREIGN KEY (email_student) REFERENCES schema.student(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2762 (class 2606 OID 16465)
-- Name: students_by_skills students_by_skills_name_skill_fkey; Type: FK CONSTRAINT; Schema: schema; Owner: postgres
--

ALTER TABLE ONLY schema.students_by_skills
    ADD CONSTRAINT students_by_skills_name_skill_fkey FOREIGN KEY (name_skill) REFERENCES schema.skill(name) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-11-13 13:45:18

--
-- PostgreSQL database dump complete
--

