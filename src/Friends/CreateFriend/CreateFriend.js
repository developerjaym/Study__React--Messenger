import Page from "../../Page/Page"
import "./CreateFriend.css"

export default function CreateFriend() {

    return (<Page pageTitle="Add friend" backRoute="/friends">
        <form>
            <label>
                Name
                <input/>
            </label>
        </form>
    </Page>)
}