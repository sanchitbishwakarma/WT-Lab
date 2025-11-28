## Lab 01: Basic Network uUtility Commands

`ipconfig` is a standard network configuration command used to manage, and troubleshoot the network interfaces on a computer. It provides information about the IP address, subnet mask, and default gateway for each network adapter. It is commonly used by network administrators and users for tasks such as checking the status of network connections, diagnosing network problems, and renewing or releasing IP addresses assigned by a DHCP server.

### Common `ipconfig` options include:

- `ipconfig /all`: Displays all detailed network configuration information, including physical MAC addresses, DHCP lease information, and DNS servers.

- `ipconfig /release`: Releases the current DHCP lease, causing the system to drop its assigned IP address temporarily.

- `ipconfig /renew`: Requests a new IP address from the DHCP server and refreshes the network connection.

- `ipconfig /flushdns`: Clears the DNS cache, which is useful when DNS resolution issues occur or when cached addresses are outdated.

### Common commands usefull:

- `ping <DOMAIN_NAME> or <IP ADDRESS>`: It is uses to test the reachability of a host on a IP network and to measure the round-trip time for messages sent from the originating host to a destination computer.

- `arp -a`: A communication protocal for discovering the linked layer address, such as MAC address, associated with an internet layer address, typically an IPv4 address.

- `tracert <IP_ADDRESS>`: It traces the path that network packets take to reach a specific IP address, listing each router(or "hop") along the way and the time it takes for packets to reach it.

- `nslookup <IP_ADDRESS>`: It is used to query the Domain Name System (DNS) to find the informatin about a domain name, such as its IP address, or to find the domain name associated with an IP address.

- `telnet <hostname> <port>`: It is a text-based connection to a remote computer to manage it remotely or test if a specific port is open.

- `netstat`: It is for"network statstics" and it is used to display various network-related information. It provides insights into network connections, routing tables, interface statistics, and protocal statistics.

## Run System commands:

- `ncpa.cpl`: It opens the Network COnnections window in windows, providing a shortcut to manage all your network adapters, such as Wi-Fi and Ethernet.