import React, { ChangeEvent, useState, useEffect } from "react";
import { Alert, Button, Container, Form, Table } from "react-bootstrap";
import { API_URL } from "..";
import { CreateContractModal } from "../components/CreateContractModal";
type ContractTypeData = {
    id: number,
    name: string;
};

type ContractData = {
    contractId: number,
    contractTypeId: number,
    date: string,
    price: number,
    count: number,
    contractor: string,
    total: number;
};

export const ContractsPage: React.FC = () =>
{
    const [contractTypeId, setContractTypeId] = useState("");
    const [contractTypesList, setContractTypesList] = useState<ContractTypeData[]>([]);
    const [contractList, setContractList] = useState<ContractData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [createModalShow, setCreateModalShow] = useState(false);

    const handleChangeContractType = (ev: ChangeEvent<HTMLSelectElement>) =>
    {
        setContractTypeId(ev.target.value);
    };

    const getContractTypesList = () =>
    {
        return <Form.Select value={contractTypeId} onChange={handleChangeContractType}>
            <option disabled value="">Выберите тип контракта</option>
            {
                contractTypesList.map((type, index) =>
                {
                    return (
                        <option key={index} value={type.id}>{type.name}</option>
                    );
                })
            }
        </Form.Select>;
    };

    const getContractTable = () =>
    {
        return <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Дата заключения</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Поставщик</th>
                    <th>Стоимость</th>
                    <th>Накладные</th>
                </tr>
            </thead>
            <tbody className="align-middle">
                {
                    contractList.map((contract, index) =>
                    {
                        return (
                            <tr key={index} data-contract-id={contract.contractId}>
                                <td>{contract.contractId}</td>
                                <td>{contract.date}</td>
                                <td>{contract.price}</td>
                                <td>{contract.count}</td>
                                <td>{contract.contractor}</td>
                                <td>{contract.total}</td>
                                <td><Button variant="success">[...]</Button></td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>;
    };

    // Загрузка списка типов контрактов.
    useEffect(() =>
    {
        const fetchContractTypesData = async () =>
        {
            let response = await fetch(`${API_URL}/contract-types`);
            setContractTypesList(await response.json()); // читать тело ответа в формате JSON
        };

        fetchContractTypesData();

    }, []);

    // Загрузка контрактов.
    useEffect(() =>
    {
        const fetchContractData = async () =>
        {
            setIsLoading(true);

            // Очищаем.
            setContractList([]);

            let response = await fetch(`${API_URL}/contracts/${contractTypeId}`);
            setContractList(await response.json());

            setIsLoading(false);

        };

        if (contractTypeId !== "")
        {
            fetchContractData();
        }

    }, [contractTypeId]);

    return (
        <>
            <Container className="d-flex flex-column mt-5 justify-content-center">
                <Alert variant="success">
                    <Alert.Heading>Контракты</Alert.Heading>
                    <span>
                        На данной странице вы можете управлять контрактами.
                        <hr />
                        Для этого необходимо выбрать тип контракта.
                        <br />
                        После этого в нижней части страницы появится список контрактов.
                    </span>
                </Alert>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Тип контракта (выбор продукта):</Form.Label>
                    {getContractTypesList()}
                    <br />
                </Form.Group>
                <p className="fw-bold">Список контрактов:</p>
                {
                    isLoading ? "Идет загрузка..."
                        : (contractTypeId !== "" ? getContractTable() : "Для начала необходимо выбрать тип контракта.")
                }

                <Button className="w-25 ms-auto" variant="warning" onClick={() => setCreateModalShow(true)}>Добавить контракт</Button>
            </Container>

            <CreateContractModal show={createModalShow} onHide={() => { setCreateModalShow(false); }}></CreateContractModal>
        </>
    );
};