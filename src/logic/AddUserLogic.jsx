import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_ROLES = gql`
  query GetRoles {
    listRolesDropdown {
      id
      code
      name
    }
  }
`;

const GET_DELEVERY_DATA = gql`
  query DeliveryAgentsDATA {
    listDeliveryAgentsDropdown {
      id
      code
      name
    }
  }
`;

const GET_CUSTOMER_DATA = gql`
  query DeliveryAgentsDATA {
    listCustomersDropdown {
      id
      code
      name
    }
  }
`;

const SUBMIT_MUTATION = gql`
  mutation submit(
    $username: String!
    $password: String!
    $roles: [Int!]!
    $accountId: Int
    $active: Boolean!
  ) {
    saveUser(
      input: {
        username: $username
        password: $password
        roles: $roles
        accountId: $accountId
        active: $active
      }
    ) {
      id
      username
    }
  }
`;

function AddUserLogic() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roles: [],
    account: "",
  });

  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const [isTrue, setIsTrue] = useState(true); // State to manage true/false

  const handleToggle = () => {
    setIsTrue(!isTrue);
  };

  const { data: rolesData } = useQuery(GET_ROLES, { fetchPolicy: "no-cache" });

  const { data: deleveryData } = useQuery(GET_DELEVERY_DATA, {
    fetchPolicy: "no-cache",
  });

  const { data: customerData } = useQuery(GET_CUSTOMER_DATA, {
    fetchPolicy: "no-cache",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [saveUser, { data, loading, error }] = useMutation(SUBMIT_MUTATION, {
    onCompleted: (data) => {
      navigate("/users");
      console.log(data);
    },
  });

  const handleRoleChange = (event, newValue) => {
    newValue.map((item) => {
      setCode(item?.code);
      setFormData((prevState) => ({
        ...prevState,
        roles: [...formData.roles, item?.id],
      }));
    });

    if (newValue.length === 0) {
      setCode("");
    }
  };

  const handleAccountChange = (event, newValue) => {
    setFormData((prevState) => ({
      ...prevState,
      account: newValue?.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const vars =
      code !== "CSTMR" || code !== "DLVRY"
        ? {
            username: formData.username,
            password: formData.password,
            roles: formData.roles,
            accountId: formData.account,
            active: isTrue,
          }
        : {
            username: formData.username,
            password: formData.password,
            roles: formData.roles,
            active: isTrue,
          };

    saveUser({
      variables: vars,
    });
  };

  return [
    code,
    setCode,
    isTrue,
    error,
    loading,
    handleToggle,
    formData,
    handleChange,
    rolesData,
    deleveryData,
    customerData,
    handleRoleChange,
    handleAccountChange,
    handleSubmit,
  ];
}

export default AddUserLogic;
