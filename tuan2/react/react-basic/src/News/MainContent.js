import React from 'react';
import Duaxe from "./duaxe.jpg";
import Tainan from "./lam1_accident.jpg"
import Mec from "./mec.jpg"
function MainContent() {
  return (
    <main>
      <div className="container">
        <div className="header">
          <a href="#Thời sự">Thời sự</a>
          <span className="date">Thứ tư, 10/7/2024, 21:09 (GMT+7)</span>
        </div>
        <div className="main-content">
          <h1>Tiêu hủy xe Lamborghini và MercedesBenz AMG G63 nhập lậu</h1>
          <p>
            QUẢNG BÌNH -Siêu xe Lamborghini và Mercedes AMG G63 nhập lậu, không
            giấy tờ, bị cơ quan chức năng tiêu hủy ngày 10/7, sau 4 năm bị tạm
            giữ.
          </p>
        <p>
            Việc tiêu hủy do Phòng Cảnh sát điều tra tội phạm về tham nhũng,
            kinh tế, buôn lậu (Công an tỉnh Quảng Bình) phối hợp với các đơn vị
            chức năng thực hiện.
          </p>

          <p>
            Chiếc Lamborghini có hai chỗ ngồi, màu xanh cốm, dung tích xi lanh
            6.500 cm3. MercedesBenz G63 AMG màu vàng, 4 chỗ ngồi, dung tích xi
            lanh 5.461 cm3. Hai siêu xe này không có giấy tờ hợp pháp và đã qua
            sử dụng khi bị tạm giữ. Sau gần bốn năm nằm tại công an Quảng Bình,
            hai xe đều không có chủ đến nhận.
          </p>
          <div class="container-img">
            <img src={Mec} alt="Mercedes" />
          </div>
          <p>
            <small
              >Siêu xe Lamborghini phai màu sau 4 năm bị tạm giữ. Ảnh: Công an
              cung cấp</small
            >
          </p>

          <p>
            Bốn năm trước, tài xế Trương Thanh Bình (56 tuổi, trú tại phường Văn
            Quán, quận Hà Đông, Hà Nội) lái xe tải biển số Hà Nội chở hai siêu
            xe Lamborghini và Mercedes AMG G63 đi từ Hà Nội vào TP HCM trên Quốc
            lộ 1A. Khi qua Quảng Bình, xe ông Bình bị Phòng Cảnh sát điều tra
            tội phạm về tham nhũng, kinh tế, buôn lậu, phối hợp với Phòng Cảnh
            sát giao thông đón dừng, kiểm tra.
          </p>

          <p>
            Tài xế không thể xuất trình giấy tờ chứng minh nguồn gốc hợp pháp
            cho hai chiếc siêu xe. Hệ thống đăng kiểm Việt Nam cũng không có dữ
            liệu về biển kiểm soát, số khung và số máy của hai phương tiện này.
            Do đó, cơ quan chức năng đã tạm giữ hai siêu xe để phục vụ điều tra.
          </p>

        </div>
        
        <section>
          <div className="news-1">
            <img src={Tainan} alt="lam1_accident" />
            <div className="news1-content">
              <h2>
                <a href="#">3 siêu xe bị tạm giữ</a>
              </h2>
              <p>
                Các ôtô có giá khoảng 4-16 tỷ đồng mỗi chiếc, không gắn đủ
                biển số, tài xế không có bằng lái, không giấy đăng ký xe... bị
                cảnh sát bắt giữ.
              </p>
            </div>
          </div>
          <div className="news-2">
            <img src={Duaxe} alt="duaxe" />
            <div className="news2-content">
              <h2>
                <a href="#">
                  Hai tài xế xe buýt rượt đuổi, giành khách trên quốc lộ bị
                  tạm giữ
                </a>
              </h2>
              <p>
                Hai người lái xe buýt rượt đuổi nhau trên quốc lộ 1, đánh võng
                không cho phương tiện khác vượt lên... để tranh giành khách,
                bị cảnh sát tạm giữ.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MainContent;