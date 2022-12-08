import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import { API_URL } from "..";
import { toISOLikeString } from "../Utils";

type CreateContractModalParams = {
    show: boolean,
    onHide: () => void;
};

type ContractTypeData = {
    id: number,
    name: string;
};

type ContractorData = {
    id: number,
    name: string;
};
type NewContractData = {
    contractTypeId: number,
    contractorId: number,
    date: string,
    price: number,
    count: number;
};

export const CreateContractModal: React.FC<CreateContractModalParams> = (params) =>
{
    const [contractTypeId, setContractTypeId] = useState("");
    const [contractTypesList, setContractTypesList] = useState<ContractTypeData[]>([]);

    const [contractorId, setContractorId] = useState("");
    const [contractorList, setContractorList] = useState<ContractorData[]>([]);

    const [date, setDate] = useState(new Date());

    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);

    const getContractTypesList = () =>
    {
        return <Form.Select value={contractTypeId} onChange={(ev) => { setContractTypeId(ev.target.value); }}>
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

    const getContractorList = () =>
    {
        return <Form.Select value={contractorId} onChange={(ev) => { setContractorId(ev.target.value); }}>
            <option disabled value="">Выберите поставщика</option>
            {
                contractorList.map((contractor, index) =>
                {
                    return (
                        <option key={index} value={contractor.id}>{contractor.name}</option>
                    );
                })
            }
        </Form.Select>;
    };

    const getPriceInput = () =>
    {
        return <InputGroup className="mb-3">
            <Form.Control value={price} onChange={(ev) => { setPrice(Number(ev.target.value)); }} />
            <InputGroup.Text>руб.</InputGroup.Text>
        </InputGroup>;
    };

    const getCountInput = () =>
    {
        return <InputGroup className="mb-3">
            <Form.Control value={count} onChange={(ev) => { setCount(Number(ev.target.value)); }} />
            <InputGroup.Text>шт.</InputGroup.Text>
        </InputGroup>;
    };

    const handleClickSaveButton = async () =>
    {

        console.log("da");

        const data: NewContractData = {
            contractorId: Number(contractorId),
            contractTypeId: Number(Number(contractTypeId)),
            count,
            date: toISOLikeString(date),
            price
        };

        console.log(data);

        const settings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        console.log(settings);

        let response = await fetch(`${API_URL}/contracts`, settings);

        if (response.status === 200)
        {
            console.log("Ok");
            params.onHide();
        }
        else
        {
            console.log("ne ok");
        }
    };

    useEffect(() =>
    {
        const fetchContractTypesData = async () =>
        {
            let response = await fetch(`${API_URL}/contract-types`);
            setContractTypesList(await response.json()); // читать тело ответа в формате JSON
        };

        fetchContractTypesData();

    }, []);

    useEffect(() =>
    {
        const fetchContractorsData = async () =>
        {
            let response = await fetch(`${API_URL}/contractors`);
            setContractorList(await response.json()); // читать тело ответа в формате JSON
        };

        fetchContractorsData();

    }, []);

    return (
        <Modal
            {...params}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание контракта
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Тип контракта:</Form.Label>
                    {getContractTypesList()}
                    <br />
                    <Form.Label className="fw-bold">Поставщик:</Form.Label>
                    {getContractorList()}
                    <br />
                    <Form.Label className="fw-bold">Дата:</Form.Label>
                    <Calendar value={date} onChange={setDate} defaultValue={new Date(3)} />
                    <br />
                    <Form.Label className="fw-bold">Цена:</Form.Label>
                    {getPriceInput()}
                    <br />
                    <Form.Label className="fw-bold">Количество:</Form.Label>
                    {getCountInput()}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => handleClickSaveButton()}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};