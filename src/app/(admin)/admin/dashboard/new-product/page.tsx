"use client";

import AutoComplete from "@/ui/input/auto-complete";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/category-services";
import Input from "@/ui/input/input";
import TextArea from "@/ui/input/textarea";

type Product = {
  name: string;
  brand: string;
  description: string;
  price: number;
  categoryId: string;
  variations: string[];
  features: string[];
};

const NewProduct = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    brand: "",
    description: "",
    price: 0,
    categoryId: "",
    variations: [],
    features: [],
  });

  const stateHandler = (e: any) => {
    setProduct({ ...product, [e.name]: e.data });
  };

  const categoryHandler = (e: { name: string; data: { id: string; name: string } }) => {
    setProduct({ ...product, [e.name]: e.data.id });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <main>
      <form action="" onSubmit={submitHandler}>
        <div className="w-full">
          <h3 className="text-admin-primary-800 text-lg text-center mb-8">Ürün Bilgileri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-16">
            <Input label="Ürün Adı" type="text" name="name" onChange={stateHandler} />
            <Input label="Marka" type="text" name="brand" onChange={stateHandler} />
            <TextArea label="Açıklama" name="description" onChange={stateHandler} />
            <Input label="Fiyat" type="number" name="price" onChange={stateHandler} />
            <AutoComplete
              fetchFunction={getCategories}
              ifNot="/admin/dashboard/new-category"
              name="categoryId"
              label="Kategori"
              onChange={categoryHandler}
              type="single"
            />
          </div>
        </div>
      </form>
    </main>
  );
};

export default NewProduct;
