const AdminCabinet = {
    render: () => {
        return `
            <section class="admin-cabinet">
                <div class="qr-scan-block">
                    <button type="button" id="scan-qr-btn" class="scan-qr-btn">TAP TO SCAN QR</button>
                    <div id="reader"></div>
                        <p class="userGiftsForAdmin closed"></p>
                    <div class="inputblock-admin closed">
                        <button type="button" class="remove-cups">-</button>
                        <input type="number" class="input-admin" value="1">
                        <button type="button" class="add-cups">+</button>
                    </div>
                    <div id="buttons-admin" class="buttons-admin closed">
                        <btn class="addbtn-admin" id="addbtn-admin">Add cups</btn>
                        <btn class="removebtn-admin" id="removebtn-admin">Remove gifts</btn>
                    </div>
                </div>
            </section>
            `;
    }
}

export default AdminCabinet;