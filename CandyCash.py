import tkinter as tk

from tkinter import simpledialog, messagebox

from tkinter import ttk

from threading import Thread

import subprocess

import re

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

 

# Function to run npm install in both frontend and backend directories

def run_npm_install():

    def task():

        try:

            # Run npm install in frontend

            frontend_dir = "./frontend"

            if os.path.exists(frontend_dir):

                subprocess.run("npm install", cwd=frontend_dir, shell=True, check=True)

                print(f"npm install completed in {frontend_dir}")

            else:

                messagebox.showwarning("Frontend Missing", "The 'frontend' directory does not exist.")

 

            # Run npm install in backend

            backend_dir = "./backend"

            if os.path.exists(backend_dir):

                subprocess.run("npm install", cwd=backend_dir, shell=True, check=True)

                print(f"npm install completed in {backend_dir}")

            else:

                messagebox.showwarning("Backend Missing", "The 'backend' directory does not exist.")

 

            messagebox.showinfo("Success", "npm install completed in both frontend and backend.")

        except subprocess.CalledProcessError as e:

            messagebox.showerror("Error", f"npm install failed: {e}")

        except Exception as e:

            messagebox.showerror("Error", f"Unexpected error: {e}")

 

    # Run the task in a separate thread to keep the GUI responsive

    Thread(target=task).start()

 

def get_current_ip():

    try:

        # Exécute la commande `ip a` pour obtenir les informations réseau

        result = subprocess.run(["ip", "a"], capture_output=True, text=True, check=True)

        output = result.stdout

 

        # Utilise une expression régulière pour capturer une adresse IPv4

        ip_pattern = r'inet (\d+\.\d+\.\d+\.\d+)'

        matches = re.findall(ip_pattern, output)

 

        # Filtre les adresses pour ignorer l'IP de loopback (127.0.0.1)

        ip_addresses = [ip for ip in matches if not ip.startswith("127.")]

       

        if ip_addresses:

            # Retourne la première IP trouvée (généralement celle de l'interface active)

            return ip_addresses[0]

        else:

            raise ValueError("Aucune adresse IP valide trouvée.")

    except subprocess.CalledProcessError as e:

        messagebox.showerror("Erreur", f"Erreur lors de l'exécution de la commande 'ip a' : {e}")

        return None

    except Exception as e:

        messagebox.showerror("Erreur", f"Impossible de récupérer l'adresse IP actuelle : {e}")

        return None

 

# Fonction pour remplacer dynamiquement les IP dans les fichiers

def replace_ip_in_files(files, new_ip):

    ip_pattern = r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b'  # Regex pour détecter une adresse IP

    try:

        for file_path in files:

            if os.path.exists(file_path):

                with open(file_path, 'r', encoding='utf-8') as file:

                    content = file.read()

                updated_content = re.sub(ip_pattern, new_ip, content)  # Remplace toutes les IP

                with open(file_path, 'w', encoding='utf-8') as file:

                    file.write(updated_content)

                print(f"IP mise à jour dans : {file_path}")

            else:

                print(f"Fichier non trouvé : {file_path}")

        messagebox.showinfo("Succès", f"L'adresse IP a été mise à jour dans tous les fichiers.")

    except Exception as e:

        messagebox.showerror("Erreur", f"Erreur lors de la mise à jour des IP : {e}")

 

# Fonction principale pour mettre à jour les fichiers avec l'IP actuelle

def update_ip():

    current_ip = get_current_ip()

    if not current_ip:

        return

 

    target_files = [

        "backend/.env",

        "backend/socket.js",

        "frontend/src/components/FearAndGreedIndicator.vue",

        "frontend/src/services/api.js",

        "frontend/src/views/ChatRoom.vue"

    ]

 

    Thread(target=replace_ip_in_files, args=(target_files, current_ip)).start()

 

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

root.geometry("300x650")

 

# Apply the ttk "clam" theme

style = ttk.Style()

style.theme_use("clam")

 

# Define styles for Start and Stop buttons

style.configure("Start.TButton", foreground="white", background="green", font=("Arial", 10, "bold"))

style.configure("Stop.TButton", foreground="white", background="red", font=("Arial", 10, "bold"))

 

# Bouton pour mettre à jour l'IP

frame_ip = ttk.LabelFrame(root, text="Gestion d'adresse IP")

frame_ip.pack(pady=10, padx=10, fill="x")

ttk.Button(frame_ip, text="Mettre à jour l'IP", command=update_ip).pack(pady=5)

 

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

 

# Add npm install button

frame_npm = ttk.LabelFrame(root, text="NPM Installation")

frame_npm.pack(pady=10, padx=10, fill="x")

ttk.Button(frame_npm, text="Run npm install", command=run_npm_install, style="Start.TButton").pack(pady=5)

 

# Quit application button

ttk.Button(root, text="Quit Application", command=quit_application, style="Stop.TButton").pack(pady=20)

 

# Modify the main window close behavior (red cross)

root.protocol("WM_DELETE_WINDOW", quit_application)

 

# Main Tkinter loop

root.mainloop()