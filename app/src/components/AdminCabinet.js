const AdminCabinet = {
    render: () => {
        return `
            <section class="admin-cabinet">
                <div class="qr-scan-block">
                    <button type="button" id="scan-qr-btn" class="scan-qr-btn closed">TAP TO SCAN QR</button>
                    <div id="reader"></div>
                    <div class="inputblock-admin">
                        <button type="button" class="remove-cups"></button>
                        <input type="number" class="input-admin">
                        <button type="button" class="add-cups"></button>
                    </div>
                    <btn class="addbtn-admin" id="addbtn-admin">Add</btn>
                    <btn class="removebtn-admin" id="removebtn-admin">Remove</btn>
                    
                </div>
            </section>
            `;
    }
}

export default AdminCabinet;