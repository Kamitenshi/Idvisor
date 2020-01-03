variable "aws_region" {
	default = "eu-west-3"
}

variable "sshkeypub" {
	default = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDY7lsIzoUhhkFcsbWYymuJnzhaXpbCMpFXKO+sz4YrA7d3PQizyLnkwOx0A4rHY1DpZOUD4IrLC/NxnFQdw8nNGF7rwzk5z20oUY1ffcBeenGOgqVP/rQjBxNtirf00q8+RNeki4+7jSikIZfRLsr16vBXplxQ+BwTvFdbhOIuwSt0uvr7azDHuJ1Y1VIe676VRWLosiC9PzsK29OGz41/rGT0piayAN7bu/glktqHa3SfGJjT6YbJ3YQ1t3dyBCbRzJ58Tucs+iaydKLjuwjSXECV4nT8knEfJE3p0ht4e/+Rs38YbKVkbE3H52Kt66hrUK88jhgDTgi5au17HWOz jigsaw@jigsaw-VirtualBox"
}

variable "private_key" {
  default = "~/.ssh/deployer"
}
