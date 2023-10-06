const AdminCabinet = {
    render: () => {
        return `
            <section class="admin-cabinet">
            <div class="qr-scan-block">
                <button type="button" id="scan-qr-btn" class="scan-qr-btn">TAP TO SCAN QR</button>
                <div id="reader"></div>
                <div id="result"></div>
            </div>
            </section>
            `;
    }
}

export default AdminCabinet;