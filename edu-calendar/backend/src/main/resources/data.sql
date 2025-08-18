-- Sample data for students
INSERT INTO student (first_name, last_name, email, major) VALUES 
('Nguyễn', 'Văn An', 'nguyen.van.an@example.com', 'Khoa học máy tính'),
('Trần', 'Thị Bình', 'tran.thi.binh@example.com', 'Toán học'),
('Lê', 'Hoàng Cường', 'le.hoang.cuong@example.com', 'Vật lý'),
('Phạm', 'Thị Dung', 'pham.thi.dung@example.com', 'Hóa học'),
('Hoàng', 'Văn Em', 'hoang.van.em@example.com', 'Sinh học');

-- Sample data for courses
INSERT INTO course (name, description, teacher, room, start_date, end_date) VALUES 
('Lập trình Java', 'Khóa học lập trình Java cơ bản đến nâng cao', 'TS. Nguyễn Văn A', 'Phòng 101', '2024-01-15', '2024-05-15'),
('Cơ sở dữ liệu', 'Thiết kế và quản lý cơ sở dữ liệu', 'PGS. Trần Thị B', 'Phòng 102', '2024-01-20', '2024-05-20'),
('Mạng máy tính', 'Kiến thức về mạng và bảo mật', 'TS. Lê Văn C', 'Phòng 103', '2024-02-01', '2024-06-01'),
('Trí tuệ nhân tạo', 'Giới thiệu về AI và Machine Learning', 'PGS. Phạm Thị D', 'Phòng 104', '2024-02-15', '2024-06-15'),
('Phát triển Web', 'HTML, CSS, JavaScript và Framework', 'TS. Hoàng Văn E', 'Phòng 105', '2024-03-01', '2024-07-01');

-- Sample data for schedules
INSERT INTO schedule (title, date, time, course_id, student_id) VALUES 
('Bài kiểm tra giữa kỳ Java', '2024-03-15', '09:00:00', 1, 1),
('Thực hành Database', '2024-03-20', '14:00:00', 2, 2),
('Seminar Mạng máy tính', '2024-03-25', '10:30:00', 3, 3),
('Project AI cuối kỳ', '2024-04-10', '08:00:00', 4, 4),
('Demo Web Application', '2024-04-15', '15:30:00', 5, 5),
('Ôn tập Java', '2024-04-20', '09:00:00', 1, 2),
('Bài tập lớn Database', '2024-04-25', '13:00:00', 2, 3);
