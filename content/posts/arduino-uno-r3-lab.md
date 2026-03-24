---
title: "Arduino Uno R3: setup nhanh cho lab & giáo trình"
slug: arduino-uno-r3-lab
excerpt: "Nguồn USB, shield phổ biến và lưu ý khi dùng chung với cảm biến công nghiệp giá rẻ."
affiliateId: sp1
category: "Arduino"
categorySlug: arduino
date: 2026-03-10
hero: teal
coverImage: "https://drive.google.com/file/d/1Qo7pfg4v37qyUnX9gZZE15Axs-R2-ToQ/view?usp=drive_link"
highlights:
  - "Nguồn USB / jack DC cho board và shield"
  - "IDE Arduino + thư viện cộng đồng đông đảo"
  - "Nâng cấp ESP32 khi cần Wi‑Fi / MQTT"
---

## Vì sao vẫn dùng Uno R3 trong lab

Arduino Uno R3 **đơn giản, ổn định** cho giáo trình và thí nghiệm nhanh: cảm biến analog, PWM, giao tiếp I2C/SPI với module phụ.

## Setup tối thiểu

1. Cài **Arduino IDE** hoặc PlatformIO, chọn board *Arduino Uno*.
2. Cấp nguồn qua **USB**; nếu gắn nhiều shield, cân nhắc **jack DC 7–12V** chất lượng.
3. Kiểm tra dòng **5V / 3V3** khi stack shield relay / LCD.

## Khi cần lên IoT

Uno không có Wi‑Fi sẵn — chuyển dần sang **ESP32** hoặc thêm module Wi‑Fi/shield tùy bài toán.

## Kết luận

Uno R3 vẫn là điểm vào tốt cho **lab và demo**. Box affiliate cuối bài dùng cùng id với gợi ý linh kiện — chỉnh `AFFILIATE_URL_SP1` theo link thật của bạn.
