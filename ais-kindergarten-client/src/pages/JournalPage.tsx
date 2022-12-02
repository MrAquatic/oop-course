import React, { ChangeEvent, ChangeEventHandler, useState, useEffect } from "react";
import { Alert, Container, Form, Table } from "react-bootstrap";

type UserData = {
    id: number,
    firstName: string,
    secondName: string,
    was: boolean;
};

export const JournalPage: React.FC = () =>
{
    const [groupId, setGroupId] = useState("");
    const [usersList, setUsersList] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getTable = (usersList: UserData[]) =>
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
                    usersList.map((user, index) =>
                    {
                        return (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.secondName}</td>
                                <td>{user.was === true ? "+" : "-"}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>;
    };

    const handleChange = (ev: ChangeEvent<HTMLSelectElement>) =>
    {
        console.log("DD", ev.target.value);
        setGroupId(ev.target.value);
    };

    useEffect(() =>
    {
        const setData = () =>
        {
            // Очищаем.
            setUsersList([]);

            if (groupId === "1")
            {
                setUsersList([
                    { id: 1, firstName: "Ваня", secondName: "Иванов", was: true },
                    { id: 2, firstName: "Ваня", secondName: "Иванов", was: true },
                    { id: 3, firstName: "Ваня", secondName: "Иванов", was: true },
                    { id: 4, firstName: "Коля", secondName: "Николаев", was: false }]);
            }
            else if (groupId === "2")
            {
                setUsersList([
                    { id: 1, firstName: "Михаил", secondName: "Михаилов", was: true },
                    { id: 4, firstName: "Артем", secondName: "Артемов", was: false }]);
            }
        };

        const getDataFromApi = () =>
        {
            console.log(`Идет загрузка данных с сервера для ${groupId}...`);

            setIsLoading(true);
            setTimeout(() =>
            {
                setIsLoading(false);
                setData();
            }, 1000);
        };

        if (groupId !== "")
        {
            getDataFromApi();
        }

    }, [groupId]);

    return (
        <Container className="d-flex flex-column h-100 justify-content-center">
            <Alert variant="success">
                <Alert.Heading>Журнал</Alert.Heading>
                <span>
                    Тут должен быть журнал.
                </span>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Список групп:</Form.Label>
                <Form.Select value={groupId} onChange={handleChange}>
                    <option disabled value="">Выберите группу</option>
                    <option value="1">Группа #1</option>
                    <option value="2">Группа #2</option>
                    <option value="3">Группа #3</option>
                </Form.Select>
            </Form.Group>
            <p className="fw-bold">Список людей:</p>
            {
                isLoading ? "Идет загрузка..."
                    : (groupId !== "" ? getTable(usersList) : "Для начала необходимо выбрать группу.")
            }

        </Container>
    );
};