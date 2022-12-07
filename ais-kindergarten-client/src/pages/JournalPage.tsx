import React, { ChangeEvent, useState, useEffect } from "react";
import { Alert, Container, Form, Table } from "react-bootstrap";
import { API_URL } from "../index";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type JournalData = {
    journalId: number,
    groupId: number,
    date: string,
    firstName: string,
    lastName: string,
    was: boolean;
};

type GroupData = {
    id: number,
    name: string;
};

export const JournalPage: React.FC = () =>
{
    const [groupId, setGroupId] = useState("");
    const [groupList, setGroupList] = useState<GroupData[]>([]);
    const [journalList, setJournalList] = useState<JournalData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date());

    const getTable = () =>
    {
        return <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Присутствовал?</th>
                </tr>
            </thead>
            <tbody>
                {
                    journalList.map((user, index) =>
                    {
                        return (
                            <tr key={index} data-journal-id={user.journalId}>
                                <td>{index + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.was === true ? "+" : "-"}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>;
    };

    const getSelectList = () =>
    {
        return <Form.Select value={groupId} onChange={handleChange}>
            <option disabled value="">Выберите группу</option>
            {
                groupList.map((group, index) =>
                {
                    return (
                        <option key={index} value={group.id}>{group.name}</option>
                    );
                })
            }
        </Form.Select>;
    };

    const handleChange = (ev: ChangeEvent<HTMLSelectElement>) =>
    {
        setGroupId(ev.target.value);
    };

    // Загрузка списка групп.
    useEffect(() =>
    {
        const fetchGroupData = async () =>
        {
            let response = await fetch(`${API_URL}/groups`);
            setGroupList(await response.json()); // читать тело ответа в формате JSON
        };

        fetchGroupData();

    }, []);

    const toISOLikeString = (d: Date) =>
    {
        return `${d.getFullYear()
            }-${`${d.getMonth() + 1}`.padStart(2, '0')
            }-${`${d.getDate()}`.padStart(2, '0')
            }`;
    };

    useEffect(() =>
    {
        const fetchJournalData = async () =>
        {
            setIsLoading(true);

            // Очищаем.
            setJournalList([]);

            console.log(date);

            const inputDate = toISOLikeString(date);

            console.log(inputDate);

            let response = await fetch(`${API_URL}/journal/${inputDate}/${groupId}`);
            setJournalList(await response.json());

            setIsLoading(false);

        };

        if (groupId !== "")
        {
            fetchJournalData();
        }

    }, [groupId, date]);

    return (
        <Container className="d-flex flex-column mt-5 justify-content-center">
            <Alert variant="success">
                <Alert.Heading>Журнал</Alert.Heading>
                <span>
                    На данной странице вы можете управлять журналом посещений.
                    <hr />
                    Для этого необходимо выбрать группу и дату.
                    <br />
                    После этого в нижней части страницы появится список людей.
                </span>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Список групп:</Form.Label>
                {getSelectList()}
                <br />
                <Form.Label className="fw-bold">Дата:</Form.Label>
                <Calendar value={date} onChange={setDate} defaultValue={new Date(3)} />
            </Form.Group>
            <p className="fw-bold">Список людей:</p>
            {
                isLoading ? "Идет загрузка..."
                    : (groupId !== "" ? getTable() : "Для начала необходимо выбрать группу.")
            }

        </Container>
    );
};