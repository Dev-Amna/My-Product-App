const api = "https://nodecrud-2i67.onrender.com/api/products";
// We post Data
export const pushData = async (data: { _id: string, name: string, price: number, image: string }) => {
  try {
    const res = await fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const respo = await res.json();
    return respo;
  }
  catch (error) {
    console.error("There was error : ", error);
  }
}

// WE Get Data 
export const getData = async () => {
  try {
    const res = await fetch(api, { method: "GET", headers: { "Content-Type": "application/json" }, })
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const respo = await res.json();
    return respo;
  }
  catch (error) {
    console.error("There was error : ", error);
  }
}
// We Delete Item

export const DeleteData = async (id: any) => {
  try {
    const res = await fetch(`${api}/${id}`, { method: "DELETE" })
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const respo = await res.json();
    return respo;
  }
  catch (error) {
    console.error("There was error : ", error);
  }
}

// We Update Data now
export const updateData = async (data:any) => {
  const res = await fetch(`${api}/${data._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
};

