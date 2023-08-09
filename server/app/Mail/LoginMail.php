<?php

namespace App\Mail;

use App\Models\User;
use App\utils\ShopApp;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class LoginMail extends Mailable
{
    use Queueable, SerializesModels;

    private $ip;
    private User $user;
    private string $appName;
    private string $host;


    /**
     * Create a new message instance.
     */
    public function __construct(User $user)
    {
        $this->user=$user;
        $this->appName=ShopApp::appName();
        $this->host=env("FRONT_HOST");
        $this->ip=ShopApp::ip();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Alert!! $this->appName Account was Logged In",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $name=explode("@",$this->user->email)[0];

        return new Content(
            view: 'mail.mail',
            with:["subject"=>strtoupper("Alert!! $this->appName Logged in."),
            "body"=>new HtmlString("Hello $name, <br>
            <h4 style='text-align:center;width:100%;'>$this->appName account was logged in</h4>. <hr/>
            <p>Your account was logged in!! from this ip $this->ip </p><br><article>if you think this was not you,
            don't hesitate to contact support, or change your password.
            <a  style='display:block;margin-top:14px;
            background-color:green;color:#fff;padding:5px 45px;text-decoration:none;border-radius:5px;'
            href='mail@$this->host'>Contact Support</a>
            </article>"),]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}