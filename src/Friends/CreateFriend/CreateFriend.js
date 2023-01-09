import { useLoaderData, useNavigate } from "react-router-dom";
import Page from "../../Page/Page"
import * as yup from "yup";
import { useFormik } from "formik";
import "./CreateFriend.css"
import { chatAppHttpClient } from "../../Extras/Utilities";

export default function CreateFriend() {
    const allUsers = useLoaderData();
    const navigate = useNavigate()
    const formSchema = yup.object().shape({
        friend: yup.string().oneOf(allUsers.map(user => user.username), "Must be a valid username!!!").max(64).min(3),
      });
    
      const formik = useFormik({
        initialValues: {
          friend: ""
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            chatAppHttpClient.addFriend(values)
        //   chatAppHttpClient.getToken(values, onTokenReceived);
            navigate('/friends')
        },
      });
    return (<Page pageTitle="Add friend" backRoute="/friends">
        <form className="form add-friend__form" onSubmit={formik.handleSubmit}>
            <label className="label">
                Name
                <input required autoComplete="none" className="input" list="allUsersList" name="friend" onChange={formik.handleChange}/>
                <datalist id="allUsersList">
                {allUsers.map(user => (<option key={user.username}>{user.username}</option>))}
                </datalist>
                <p className="form__error">{formik.errors.friend}</p>
            </label>
            <button className="button button--submit" type="submit">Add</button>
        </form>
    </Page>)
}