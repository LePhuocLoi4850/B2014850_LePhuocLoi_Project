<template>
    <div>
        <div id="banner">
            <div class="box-left">
                <h2>
                    <span>THỨC ĂN</span>
                    <br>
                    <span>THƯỢNG HẠNG</span>
                </h2>
                <p>Chuyên cung cấp các món ăn đảm bảo dinh dưỡng
                    hợp vệ sinh đến người dùng,phục vụ người dùng 1 cái
                    hoàn hảo nhất</p>
                <button>Mua ngay</button>
            </div>
        </div>
    </div>
</template>
<style scoped>

#banner {
    width: 100%;
    background-image: url("@/assets/img/banner.png");
    height: 463px;
    /* margin-top: 40px; */
    display: flex;
    padding: 0px 133px;
    position: relative;
}

#banner .box-left {
    width: 50%;
}

#banner .box-left h2 {
    font-size: 48px;
    margin-top: 75px;
    color: #fff;
    font-family: 'Times New Roman', Times, serif;
}

#banner .box-left p {
    color: #D0D0D0;
    font-family: "Varela_Round variant0", Tofu;

}

#banner .box-left button {
    width: 191px;
    height: 40px;
    margin-top: 41px;
    background: #5e5555;
    border: none;
    outline: none;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
    transition: 0.4s;
}

#banner .box-left button:hover {
    background: orange;
}
</style>