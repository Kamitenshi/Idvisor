resource "aws_key_pair" "admin2" {
   key_name   = "admin2"
   public_key = "${var.sshkeypub}"
 }
 resource "aws_instance" "nlpfubuntu" {
   ami           = "ami-087855b6c8b59a9e4"
   instance_type = "t2.micro"
   key_name      = "admin2"
   tags = {
       tag1 = "nlpf"
       }
 }
