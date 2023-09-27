import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./managerproduct.css";
import {
  Table,
  Image,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../../../redux/productSlice/productSlice";
import TextArea from "antd/es/input/TextArea";
import { getCategory } from "../../../redux/categorySlice/categorySlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";

export default function Product() {
  const products = useSelector((state) => state.product.data);
  const categories = useSelector((state) => state.category.data);
  // console.log(categories);
  const dispatch = useDispatch();

  //  ==============   ve bang =========================
  const colums = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (des) => <span>{des.substring(0, 30)}...</span>,
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => <Image width={50} src={image} alt="" />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 200,
      render: (_, product) => (
        <div style={{ display: "flex", gap: "0 20px" }}>
          <Button onClick={() => showModal(product)}>Edit</Button>
          <Button danger onClick={() => showModalDelete(product.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  // ===================================================

  // =================  xoa =============================
  const [idDelete, setIdDelete] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const showModalDelete = (id) => {
    setIdDelete(id);
    setIsOpenModalDelete(true);
  };
  const handleOkDelete = () => {
    dispatch(deleteProduct(idDelete));
    dispatch(getAllProduct());
    handleCancelDelete();
  };
  const handleCancelDelete = () => {
    setIdDelete();
    setIsOpenModalDelete(false);
  };
  // =========================================================

  // ==================== them ===============================
  const [infoProduct, setInfoProduct] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [linkImg, setLinkImg] = useState("");

  // === sua ====
  const [infoProdctUpdate, setInfoProdctUpdate] = useState();
  const [formRef] = Form.useForm();

  const showModal = async (product) => {
    const { image, ...data } = product;
    setLinkImg(image);
    setIsOpenModal(true);
    formRef.setFieldsValue(data);
    setInfoProdctUpdate(product);
  };
  const handleOk = () => {
    setIsOpenModal(false);
  };
  const handleCancel = () => {
    formRef.resetFields();
    setInfoProdctUpdate();
    setFileUpload();
    setLinkImg("");
    setIsOpenModal(false);
  };

  const handleChangeSelectCategory = () => {};

  const handleFileChange = (e) => {
    setFileUpload(e.target.files[0]);
    setLinkImg(URL.createObjectURL(e.target.files[0]));
  };

  const onFinish = (values) => {
    // console.log("thong tin:", values);

    if (infoProdctUpdate && infoProdctUpdate.id) {
      console.log("update");
      if (linkImg.includes("https")) {
        // console.log("update ko sua  anh");
        // console.log("==> :", values);
        dispatch(
          updateProduct({
            ...values,
            id: infoProdctUpdate.id,
            image: linkImg,
          })
        );
        dispatch(getAllProduct());
        handleCancel();
      } else {
        // console.log("update co sua anh");
        const imageRef = ref(storage, `image/${fileUpload.name}`);
        uploadBytes(imageRef, fileUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              return {
                ...values,
                id: infoProdctUpdate.id,
                image: url,
              };
            })
            .then((data) => {
              dispatch(updateProduct(data));
              dispatch(getAllProduct());
              handleCancel();
            })
            .catch((error) => {
              console.log(error);
              notification.error({
                message: "Lỗi",
                description: "Loi",
              });
            });
        });
      }

      return;
    }

    if (!fileUpload) {
      notification.warning({
        message: "Chon file",
        description: "Chon file",
      });
      return;
    }

    console.log("them sp");
    const imageRef = ref(storage, `image/${fileUpload.name}`);
    uploadBytes(imageRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          return {
            ...values,
            image: url,
          };
        })
        .then((data) => {
          dispatch(createProduct(data));
          dispatch(getAllProduct());
          handleCancel();
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: "Lỗi",
            description: "Loi",
          });
        });
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // =========================================================

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getCategory());
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Modal
        title="Delete Product"
        maskClosable={false}
        open={isOpenModalDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <p>Ban co chac muon xoa ?</p>
      </Modal>

      <Modal
        title={
          infoProdctUpdate && infoProdctUpdate.id
            ? "Update Product"
            : "Add Product"
        }
        maskClosable={false}
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form
          name="basic"
          form={formRef}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="product_name"
            rules={[
              {
                required: true,
                message: "Please input your product_name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category_id"
            rules={[
              {
                required: true,
                message: "Please input your category_id!",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              onChange={handleChangeSelectCategory}
              options={categories.map((cate) => {
                return {
                  value: cate.id,
                  label: cate.category_name,
                };
              })}
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input your quantity!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <div className="flex justify-center mb-6">
            <Image width={100} src={linkImg} alt="img" />
          </div>

          <Form.Item label="Image" name="image">
            <Input type="file" onChange={handleFileChange} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Row>
        <Col span={12}>
          <Button style={{ minWidth: 100 }} onClick={showModal}>
            Add
          </Button>
        </Col>
        <Col span={12}></Col>
      </Row>

      <br />

      <div className="mx-4">
        <Table dataSource={products} columns={colums} />
      </div>
    </div>
  );
}
