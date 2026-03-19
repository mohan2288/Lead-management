import { Button, Card, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { editUser, viewUser } from "../../services/SettingServices";

interface User {
  User_ID: number;
  First_Name: string;
  Last_Name: string;
  Email: string;
  user_role: string;
  Phone: string;
}

function Team() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phone: "",
    user_role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await viewUser();
      setUsers(res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      if (!selectedUser) return;

      await editUser(selectedUser.User_ID, formData);
      toast.success("User updated successfully");
      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <Card loading={loading}>
      <div className="flex justify-between items-center 
      max-sm:flex-col max-sm:items-start gap-3">
        <h1 className="text-lg font-semibold">Team Members</h1>
        <Button size="large" type="primary">Add Members</Button>
      </div>
      <br />
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.User_ID} 
          className="flex justify-between items-center border border-blue-100 p-3!
          max-sm:flex-col gap-2">

            <div className="flex items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${user.First_Name}`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h1>{user.First_Name} {user.Last_Name}</h1>
                <p>{user.Email}</p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <p>{user.user_role}</p>
              <h1>{user.Phone}</h1>
              <Button type="link" onClick={() => handleEdit(user)}>Edit</Button>
            </div>

          </div>
        ))}
      </div>

      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdate}
      >
        <Input name="First_Name" value={formData.First_Name} onChange={handleChange} placeholder="First Name" className="mb-2" />
        <Input name="Last_Name" value={formData.Last_Name} onChange={handleChange} placeholder="Last Name" className="mb-2" />
        <Input name="Email" value={formData.Email} onChange={handleChange} placeholder="Email" className="mb-2" />
        <Input name="Phone" value={formData.Phone} onChange={handleChange} placeholder="Phone" className="mb-2" />
        <Input name="user_role" value={formData.user_role} onChange={handleChange} placeholder="Role" />
      </Modal>
    </Card>
  );
}

export default Team;
