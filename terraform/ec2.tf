resource "aws_key_pair" "deployer" {
  key_name = "deployer key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC91oprCtxPNXdoIeYRKrIHpPE9wlZRgx8O08yWTJ6Fv7wcByxgaTDfHYQT5+KeFJuJqlgrwmaFGG5gsY77l0g1Ya+UQM0CbP7Bi8DtS8YRD2WMpPHL3Bjkp6VFvMnWtlWr9d6Ecvoyv0wkWec/Yfb6w/RwNbYBivUXj7aAmZH411cAhcRGWmqTcVotNwYMzYW90zaIe7sK+jLVyAv/n38NaqkelYaos0QU3pdqhnNQOL3m2ymt1D9xL5dFHC6NxoKkvJaU8h8DgbMSDOT8oIxoIc3VFG/E8l7CuUHrDp67j5A9AWAHPxQvXZ/3nSZD6SRZksEoRQ8z+mRHzJFqQrIb jigsaw@jigsaw-VirtualBox"
}

 resource "aws_instance" "nlpfubuntu" {
   ami           = "ami-087855b6c8b59a9e4"
   instance_type = "t2.micro"
   key_name      = "${aws_key_pair.deployer.key_name}"
   tags = {
       tag1 = "nlpf"
       }

  provisioner "local-exec" {
    command =  "sleep 20; sudo echo ${aws_instance.nlpfubuntu.public_ip} > /etc/ansible/hosts"
  }
  
  provisioner "local-exec" {
        command = "sleep 100; export ANSIBLE_HOST_KEY_CHECKING=False; sudo ansible-playbook -u ubuntu --private-key ${var.private_key} playbook-install-docker.yml; pip install docker-compose; sed -i -e 's/XX_FRONT_ADDR_XX/${aws_instance.nlpfubuntu.public_ip}/g' .envback; sed -i -e 's/XX_BACK_ADDR_XX/${aws_instance.nlpfubuntu.public_ip}/g' .envfront; cat .envfront; cat .envback; ls -la; sudo ansible-playbook -u ubuntu --private-key ${var.private_key} playbook-docker-compose.yml"
    }


}

