import tkinter as tk
from tkinter import simpledialog, messagebox
from threading import Thread
import subprocess
import os


# Classe pour gérer les processus
class ProcessManager:
    def __init__(self):
        self.processes = {}

    def start_process(self, key, command, directory=None):
        if key in self.processes and self.processes[key].poll() is None:
            messagebox.showwarning("Processus déjà en cours", f"Le processus '{key}' est déjà en cours.")
            return

        try:
            if directory:
                process = subprocess.Popen(command, cwd=directory, shell=True)
            else:
                process = subprocess.Popen(command, shell=True)
            self.processes[key] = process
        except Exception as e:
            messagebox.showerror("Erreur", f"Erreur lors du démarrage : {e}")

    def stop_process(self, key):
        if key in self.processes and self.processes[key].poll() is None:
            self.processes[key].terminate()
            self.processes[key].wait()
            messagebox.showinfo("Succès", f"Le processus '{key}' a été arrêté.")
        else:
            messagebox.showwarning("Aucun processus", f"Aucun processus actif pour '{key}'.")


# Instancier le gestionnaire de processus
process_manager = ProcessManager()

# Variables globales pour IP
ip_base = "A.B.C.D"  # Remplacez "A.B.C.D" par l'IP de base souhaitée
ip_actuelle = None  # Cette variable stockera la dernière IP saisie


# Gestion des ports avec UFW
ports = [3000, 4000, 5000, 27017]


def open_all_ports():
    def task():
        try:
            for port in ports:
                subprocess.run(f"sudo ufw allow {port}", shell=True, check=True)
            messagebox.showinfo("Succès", "Tous les ports ont été ouverts avec UFW.")
        except subprocess.CalledProcessError as e:
            messagebox.showerror("Erreur", f"Erreur lors de l'ouverture des ports : {e}")
    Thread(target=task).start()


def close_all_ports():
    def task():
        try:
            for port in ports:
                subprocess.run(f"sudo ufw delete allow {port}", shell=True, check=True)
            messagebox.showinfo("Succès", "Tous les ports ont été fermés avec UFW.")
        except subprocess.CalledProcessError as e:
            messagebox.showerror("Erreur", f"Erreur lors de la fermeture des ports : {e}")
    Thread(target=task).start()


# Fonctions pour démarrer/arrêter les tâches
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


# Fonction pour remplacer une chaîne dans les fichiers
def remplacer_chaine_fichiers(fichiers_cibles, chaine_recherche, chaine_remplacement):
    for chemin_fichier in fichiers_cibles:
        if os.path.exists(chemin_fichier):
            try:
                with open(chemin_fichier, 'r', encoding='utf-8') as f:
                    contenu = f.read()
                contenu_modifie = contenu.replace(chaine_recherche, chaine_remplacement)
                with open(chemin_fichier, 'w', encoding='utf-8') as f:
                    f.write(contenu_modifie)
                print(f"Modifications effectuées dans : {chemin_fichier}")
            except Exception as e:
                print(f"Erreur avec le fichier {chemin_fichier} : {e}")
        else:
            print(f"Fichier introuvable : {chemin_fichier}")


# Fonction appelée par le bouton pour ouvrir la boîte de dialogue
def ouvrir_boite_dialogue():
    global ip_actuelle
    fichiers_cibles = [
        "backend/.env",
        "backend/socket.js",
        "frontend/src/components/FearAndGreedIndicator.vue",
        "frontend/src/services/api.js",
        "frontend/src/views/ChatRoom.vue"
    ]

    chaine_remplacement = simpledialog.askstring(
        "Entrer une adresse IP",
        f"Entrez l'adresse IP de remplacement pour '{ip_base}' :"
    )

    if chaine_remplacement:
        remplacer_chaine_fichiers(fichiers_cibles, ip_base, chaine_remplacement)
        ip_actuelle = chaine_remplacement  # Mémoriser la nouvelle IP
        messagebox.showinfo("Succès", f"Les fichiers ont été mis à jour avec la nouvelle IP : {chaine_remplacement}.")
    else:
        messagebox.showwarning("Annulé", "Aucune modification effectuée.")


# Fonction pour remettre l'IP de base
def remettre_ip_base():
    global ip_actuelle
    if ip_actuelle is None:
        messagebox.showwarning("Aucune IP à réinitialiser", "Aucune IP précédente à remplacer.")
        return

    fichiers_cibles = [
        "backend/.env",
        "backend/socket.js",
        "frontend/src/components/FearAndGreedIndicator.vue",
        "frontend/src/services/api.js",
        "frontend/src/views/ChatRoom.vue"
    ]

    remplacer_chaine_fichiers(fichiers_cibles, ip_actuelle, ip_base)
    messagebox.showinfo("Succès", f"Les fichiers ont été réinitialisés à l'IP de base : {ip_base}.")
    ip_actuelle = None  # Réinitialiser l'état pour empêcher d'autres remplacements inutiles


# Interface graphique avec Tkinter
root = tk.Tk()
root.title("Gestion Système, Frontend & Backend")

# Section Ports
frame_ports = tk.Frame(root)
frame_ports.pack(pady=10)
tk.Button(frame_ports, text="Ouvrir tous les ports", command=open_all_ports).pack(side=tk.LEFT, padx=5)
tk.Button(frame_ports, text="Fermer tous les ports", command=close_all_ports).pack(side=tk.LEFT, padx=5)

# Section Frontend/Backend avec boutons d'arrêt
frame_frontend = tk.Frame(root)
frame_frontend.pack(pady=5)
tk.Button(frame_frontend, text="Démarrer Frontend", command=run_frontend).pack(side=tk.LEFT)
tk.Button(frame_frontend, text="Arrêter Frontend", command=stop_frontend).pack(side=tk.LEFT)

frame_backend = tk.Frame(root)
frame_backend.pack(pady=5)
tk.Button(frame_backend, text="Démarrer Backend", command=run_backend).pack(side=tk.LEFT)
tk.Button(frame_backend, text="Arrêter Backend", command=stop_backend).pack(side=tk.LEFT)

frame_chat = tk.Frame(root)
frame_chat.pack(pady=5)
tk.Button(frame_chat, text="Démarrer Chat", command=run_chat).pack(side=tk.LEFT)
tk.Button(frame_chat, text="Arrêter Chat", command=stop_chat).pack(side=tk.LEFT)

# Boutons pour remplacer et remettre l'IP de base
btn_remplacer_ip = tk.Button(root, text="Remplacer l'IP", command=ouvrir_boite_dialogue)
btn_remplacer_ip.pack(pady=10)

btn_remettre_ip_base = tk.Button(root, text="Remettre l'IP de base", command=remettre_ip_base)
btn_remettre_ip_base.pack(pady=10)

# Boucle principale Tkinter
root.mainloop()
