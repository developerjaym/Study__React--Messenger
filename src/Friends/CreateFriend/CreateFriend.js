import Page from "../../Page/Page"
import "./CreateFriend.css"

export default function CreateFriend() {

    return (<Page pageTitle="Add friend">
        <form>
            <label>
                Name
                <input/>
            </label>
        </form>
    </Page>)
}