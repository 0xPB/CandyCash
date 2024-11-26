import tkinter as tk
from tkinter import simpledialog, messagebox
from tkinter import ttk
from threading import Thread
import subprocess
import os

# Class to manage processes
class ProcessManager:
    def __init__(self):
        self.processes = {}

    def start_process(self, key, command, directory=None):
        if key in self.processes and self.processes[key].poll() is None:
            messagebox.showwarning("Process Already Running", f"The process '{key}' is already running.")
            return

        try:
            if directory:
                process = subprocess.Popen(command, cwd=directory, shell=True)
            else:
                process = subprocess.Popen(command, shell=True)
            self.processes[key] = process
        except Exception as e:
            messagebox.showerror("Error", f"Error starting process: {e}")

    def stop_process(self, key):
        if key in self.processes and self.processes[key].poll() is None:
            self.processes[key].terminate()
            self.processes[key].wait()
            messagebox.showinfo("Success", f"The process '{key}' has been stopped.")
        else:
            messagebox.showwarning("No Active Process", f"No active process found for '{key}'.")

# Instantiate the process manager
process_manager = ProcessManager()

# Global variables for IP
ip_base = "A.B.C.D"  # Replace "A.B.C.D" with the desired base IP
ip_current = None  # This variable will store the last entered IP

# Port management with UFW
ports = [3000, 4000, 5000, 27017]

def open_all_ports():
    def task():
        try:
            for port in ports:
                subprocess.run(f"sudo ufw allow {port}", shell=True, check=True)
            messagebox.showinfo("Success", "All ports have been opened with UFW.")
        except subprocess.CalledProcessError as e:
            messagebox.showerror("Error", f"Error opening ports: {e}")
    Thread(target=task).start()

def close_all_ports():
    def task():
        try:
            for port in ports:
                subprocess.run(f"sudo ufw delete allow {port}", shell=True, check=True)
            messagebox.showinfo("Success", "All ports have been closed with UFW.")
        except subprocess.CalledProcessError as e:
            messagebox.showerror("Error", f"Error closing ports: {e}")
    Thread(target=task).start()

# Functions to start/stop tasks
def run_frontend():
    process_manager.start_process("frontend", "npm run dev", "./frontend")

def stop_frontend():
    process_manager.stop_process("frontend")

def run_backend():
    process_manager.start_process("backend", "npm start", "./backend")

def stop_backend():
    process_manager.stop_process("backend")

def run_chat():
    process_manager.start_process("chat", "node socket.js", "./backend")

def stop_chat():
    process_manager.stop_process("chat")

# Function to replace a string in files
def replace_string_in_files(target_files, search_string, replace_string):
    for file_path in target_files:
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                updated_content = content.replace(search_string, replace_string)
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"Changes applied to: {file_path}")
            except Exception as e:
                print(f"Error with file {file_path}: {e}")
        else:
            print(f"File not found: {file_path}")

# Function called by the button to open the dialog box
def open_ip_dialog():
    global ip_current
    target_files = [
        "backend/.env",
        "backend/socket.js",
        "frontend/src/components/FearAndGreedIndicator.vue",
        "frontend/src/services/api.js",
        "frontend/src/views/ChatRoom.vue"
    ]

    replace_string = simpledialog.askstring(
        "Enter IP Address",
        f"Enter the replacement IP address for '{ip_base}':"
    )

    if replace_string:
        replace_string_in_files(target_files, ip_base, replace_string)
        ip_current = replace_string  # Remember the new IP
        messagebox.showinfo("Success", f"The files have been updated with the new IP: {replace_string}.")
    else:
        messagebox.showwarning("Cancelled", "No changes were made.")

# Function to reset to the base IP
def reset_to_base_ip():
    global ip_current
    if ip_current is None:
        messagebox.showwarning("No IP to Reset", "No previous IP to reset.")
        return

    target_files = [
        "backend/.env",
        "backend/socket.js",
        "frontend/src/components/FearAndGreedIndicator.vue",
        "frontend/src/services/api.js",
        "frontend/src/views/ChatRoom.vue"
    ]

    replace_string_in_files(target_files, ip_current, ip_base)
    messagebox.showinfo("Success", f"The files have been reset to the base IP: {ip_base}.")
    ip_current = None  # Reset state to prevent further unnecessary replacements

# Function to quit the application
def quit_application():
    if messagebox.askokcancel("Quit", "Do you really want to quit the application?"):
        # Stop all running processes
        for key in list(process_manager.processes.keys()):
            process_manager.stop_process(key)
        
        # Close the main window
        root.destroy()

# GUI with Tkinter
root = tk.Tk()
root.title("CandyCash Manager")
root.geometry("300x550")

# Apply the ttk "clam" theme
style = ttk.Style()
style.theme_use("clam")

# Define styles for Start and Stop buttons
style.configure("Start.TButton", foreground="white", background="green", font=("Arial", 10, "bold"))
style.configure("Stop.TButton", foreground="white", background="red", font=("Arial", 10, "bold"))

# Ports section
frame_ports = ttk.LabelFrame(root, text="Port Management")
frame_ports.pack(pady=10, padx=10, fill="x")
ports_container = ttk.Frame(frame_ports)
ports_container.pack(pady=5)
ttk.Button(ports_container, text="Open All Ports", command=open_all_ports, style="Start.TButton").grid(row=0, column=0, padx=10)
ttk.Button(ports_container, text="Close All Ports", command=close_all_ports, style="Stop.TButton").grid(row=0, column=1, padx=10)

# Frontend/Backend/Chat sections
def create_service_frame(service_name, start_command, stop_command):
    frame = ttk.LabelFrame(root, text=f"{service_name} Management")
    frame.pack(pady=10, padx=10, fill="x")

    # Create a container for buttons and center them
    button_container = ttk.Frame(frame)
    button_container.pack(pady=5)

    # Add buttons side by side
    ttk.Button(button_container, text=f"Start {service_name}", command=start_command, style="Start.TButton").grid(row=0, column=0, padx=10)
    ttk.Button(button_container, text=f"Stop {service_name}", command=stop_command, style="Stop.TButton").grid(row=0, column=1, padx=10)

create_service_frame("Frontend", run_frontend, stop_frontend)
create_service_frame("Backend", run_backend, stop_backend)
create_service_frame("Chat", run_chat, stop_chat)

# Replace and reset IP buttons
frame_ip = ttk.LabelFrame(root, text="IP Address Management")
frame_ip.pack(pady=10, padx=10, fill="x")
ip_container = ttk.Frame(frame_ip)
ip_container.pack(pady=5)
ttk.Button(ip_container, text="Replace IP", command=open_ip_dialog).grid(row=0, column=0, padx=10)
ttk.Button(ip_container, text="Reset to Base IP", command=reset_to_base_ip).grid(row=0, column=1, padx=10)

# Quit application button
ttk.Button(root, text="Quit Application", command=quit_application, style="Stop.TButton").pack(pady=20)

# Modify the main window close behavior (red cross)
root.protocol("WM_DELETE_WINDOW", quit_application)

# Main Tkinter loop
root.mainloop()
